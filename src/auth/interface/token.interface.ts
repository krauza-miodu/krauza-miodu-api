export interface TokenHeader {
  alg: string;
  typ: string;
}

export interface TokenPayloadAppData {
  email: string;
}

export interface TokenPayload extends TokenPayloadAppData {
  iat: number;
  exp: number;
}

export type TokenSecret = string;

export interface Token {
  header: TokenHeader;
  payload: TokenPayload;
  secret: TokenSecret;
}

export interface TokenJson {
  access_token: string;
}
