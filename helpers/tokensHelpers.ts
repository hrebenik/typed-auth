import { Response } from 'express';
// plugins
const jwt = require('jsonwebtoken');

const generateAccessToken = async (userId: string, userEmail: string): Promise<void> => {
  const tokenInfo = {
    userId,
    userEmail,
  };
  return jwt.sign(
    tokenInfo,
    process.env.SECRET_TOKEN_PHRASE,
    { expiresIn: '15min' },
  );
};

const putRefreshTokenToCookies = async (
  userId: string,
  userEmail: string,
  res: Response,
): Promise<void> => {
  const tokenInfo = {
    userId,
    userEmail,
  };
  const refreshToken = await jwt.sign(
    tokenInfo,
    process.env.SECRET_TOKEN_PHRASE,
    { expiresIn: '30d' },
  );
  res.cookie('token', refreshToken, {
    httpOnly: true,
  });
};

export {
  generateAccessToken,
  putRefreshTokenToCookies,
};
