export interface IJwtServicePayload {
  email: string;
  role: string;
  name: string;
  id: string;
}

export interface IJwtService {
  checkToken(token: string): Promise<any>;
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string
  ): string;
}
