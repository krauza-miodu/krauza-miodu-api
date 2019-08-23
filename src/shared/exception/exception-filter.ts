import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { BaseException } from './base.exception';
import { EntityNotFoundException } from './entity-not-found.exception';
import { UniqueConstraintViolationException } from './unique-constraint-violation.exception';
import { EntityIntegrityViolationException } from './entity-integrity-violation.exception';

@Catch()
export class AppExceptionFilter extends BaseExceptionFilter {

  catch(exception: BaseException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse();
    let status: HttpStatus;
    let message = exception.message;

    if (exception instanceof EntityNotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = message || 'Entity not found.';
    } else if (exception instanceof UniqueConstraintViolationException) {
      status = HttpStatus.CONFLICT;
      message = message || 'Entity\'s unique constraint violation.';
    } else if (exception instanceof EntityIntegrityViolationException) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = message || 'Entity\'s integrity violation.';
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message.error;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Unknown error.';
    }

    this.logException(exception);

    response
      .status(status)
      .json({
        statusCode: status,
        error: message
      });
  }

  private logException(exception: BaseException): void {
    console.error(exception);
    // @TODO implement
  }

}
