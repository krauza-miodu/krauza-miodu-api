/**
 * Workaround for the TypeScript-related issue:
 * https://github.com/Microsoft/TypeScript/issues/13965
 */
/* tslint:disable */
export class BaseException extends Error {

  constructor(message?: string) {
    const realProto = new.target.prototype;
    super(message);
    Object.setPrototypeOf(this, realProto);
  }

}
