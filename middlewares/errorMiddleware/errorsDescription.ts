// typescript types
import { CustomErrorResponse, ErrorsDescription } from '../../customTypes';

// error types
const USER_EXIST = 'USER_EXIST';
const USER_NOT_FOUND = 'USER_NOT_FOUND';
const NO_EMAIL_AND_PASSWORD = 'NO_EMAIL_AND_PASSWORD';
const NO_EMAIL = 'NO_EMAIL';
const NO_PASSWORD = 'NO_PASSWORD';
const WRONG_EMAIL_PASSWORD = 'WRONG_EMAIL_PASSWORD';
const NOT_AUTHORIZED = 'NOT_AUTHORIZED';
const NO_TOKEN_PROVIDED = 'NO_TOKEN_PROVIDED';
const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

const errorsDescription: ErrorsDescription = {
  [USER_EXIST]: <CustomErrorResponse>{ message: 'User already exists', status: 400 },
  [NO_EMAIL_AND_PASSWORD]: <CustomErrorResponse>{ message: 'Email and password are required', status: 401 },
  [WRONG_EMAIL_PASSWORD]: <CustomErrorResponse>{ message: 'Wrong email or Password', status: 401 },
  [NO_EMAIL]: <CustomErrorResponse>{ message: 'Email is required', status: 401 },
  [NO_PASSWORD]: <CustomErrorResponse>{ message: 'Password is required', status: 401 },
  'jwt expired': { message: 'token is expired', status: 401 },
  [NO_TOKEN_PROVIDED]: <CustomErrorResponse>{ message: 'no token provided', status: 401 },
  'invalid token': { message: 'invalid token', status: 401 },
  [NOT_AUTHORIZED]: <CustomErrorResponse>{ message: 'User not authorized', status: 401 },
  [USER_NOT_FOUND]: <CustomErrorResponse>{ message: 'User not found', status: 404 },
  [UNKNOWN_ERROR]: <CustomErrorResponse>{ message: 'Something went wrong', status: 500 },
};

export {
  errorsDescription,
  UNKNOWN_ERROR,
  USER_EXIST,
  USER_NOT_FOUND,
  NOT_AUTHORIZED,
  NO_TOKEN_PROVIDED,
  NO_EMAIL_AND_PASSWORD,
  NO_EMAIL,
  WRONG_EMAIL_PASSWORD,
  NO_PASSWORD,
};
