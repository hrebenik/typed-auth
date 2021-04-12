import { NextFunction, Request, Response } from 'express';
// error types
import {
  NO_EMAIL,
  NO_EMAIL_AND_PASSWORD,
  NO_PASSWORD,
  NO_TOKEN_PROVIDED,
  NOT_AUTHORIZED,
  UNKNOWN_ERROR,
  USER_EXIST,
  USER_NOT_FOUND,
  WRONG_EMAIL_PASSWORD,
} from './middlewares/errorMiddleware/errorsDescription';

// using when decoding token
interface UserFromToken {
  userId: string,
  userEmail: string,
}
// used to include custom fields
interface CustomRequest extends Request {
  currentUser?: UserFromToken,
  decodedRefreshToken?: UserFromToken,
}

// default middleware description
type Middleware = {
  // eslint-disable-next-line no-unused-vars
  (req: CustomRequest, res: Response, next: NextFunction): Promise<void>
};

interface AuthControllerDefinition {
  registration: Middleware
  login: Middleware
  tokenRefresh: Middleware
}

// ? ErrorDescription description :)
interface CustomErrorResponse {
  message: string,
  status: number,
}
interface ErrorsDescription {
  [USER_EXIST]: CustomErrorResponse,
  [NO_EMAIL_AND_PASSWORD]: CustomErrorResponse,
  [WRONG_EMAIL_PASSWORD]: CustomErrorResponse,
  [NO_EMAIL]: CustomErrorResponse,
  [NO_PASSWORD]: CustomErrorResponse,
  'jwt expired': CustomErrorResponse,
  [NO_TOKEN_PROVIDED]: CustomErrorResponse,
  'invalid token': CustomErrorResponse,
  [NOT_AUTHORIZED]: CustomErrorResponse,
  [USER_NOT_FOUND]: CustomErrorResponse,
  [UNKNOWN_ERROR]: CustomErrorResponse,

  [index: string]: CustomErrorResponse,
}

export {
  UserFromToken,
  Middleware,
  CustomRequest,
  AuthControllerDefinition,
  CustomErrorResponse,
  ErrorsDescription,
};
