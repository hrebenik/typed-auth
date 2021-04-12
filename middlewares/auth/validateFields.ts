// typescript types
import { CustomRequest, Middleware } from '../../customTypes';
// error types
import {
  NO_EMAIL, NO_EMAIL_AND_PASSWORD, NO_PASSWORD, NOT_AUTHORIZED,
} from '../errorMiddleware/errorsDescription';
// plugins
const jwt = require('jsonwebtoken');

// ! helpers START
const emailAndPasswordCheck = (req: CustomRequest): void => {
  const { email, password } = req.body || {};
  if (!email && !password) throw Error(NO_EMAIL_AND_PASSWORD);
  if (!email) throw Error(NO_EMAIL);
  if (!password) throw Error(NO_PASSWORD);
};
// ! helpers END

// ! Middlewares
const validateLogFields: Middleware = async (req, res, next) => {
  try {
    emailAndPasswordCheck(req);

    next();
  } catch (error) {
    next(error.message);
  }
};

const validateRegFields: Middleware = async (req, res, next) => {
  try {
    emailAndPasswordCheck(req);

    next();
  } catch (error) {
    next(error.message);
  }
};

const refreshTokenValidation: Middleware = async (req, res, next) => {
  try {
    const { token } = req.cookies || {};
    if (!token) throw Error(NOT_AUTHORIZED);

    req.decodedRefreshToken = await jwt.verify(token, process.env.SECRET_TOKEN_PHRASE);
    next();
  } catch (error) {
    console.log('tokenRefresh error: >>');
    console.dir(error);
    next(error.message);
  }
};

export {
  validateLogFields,
  validateRegFields,
  refreshTokenValidation,
};
