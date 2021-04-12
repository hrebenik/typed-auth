// plugins
// helpers
import { generateAccessToken, putRefreshTokenToCookies } from '../helpers/tokensHelpers';
// error types
import { USER_EXIST, USER_NOT_FOUND, WRONG_EMAIL_PASSWORD } from '../middlewares/errorMiddleware/errorsDescription';
// models
import User from '../models/user';
// types
import { AuthControllerDefinition, Middleware, UserFromToken } from '../customTypes';
// plugins
const bcrypt = require('bcrypt');

class AuthController implements AuthControllerDefinition {
  registration: Middleware = async (req, res, next) => {
    try {
      const {
        email, password,
      } = req.body;

      // check user exists
      const registeredUser = await User.findOne({ email });
      if (registeredUser) return next(USER_EXIST);

      // hash new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create new user
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      // save new user
      const savedUser = await newUser.save();

      console.log(`Saved New User ID :>> ${savedUser.id}`);

      res.status(201).json({ message: 'User was created' });
    } catch (error) {
      console.log('error: registration :>> ');
      console.dir(error);
      res.status(404).json(error);
    }
  }

  login: Middleware = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // check user exists
      const registeredUser = await User.findOne({ email });
      if (!registeredUser) return next(USER_NOT_FOUND);

      // get user credentials
      const {
        id: registeredUserId,
        email: registeredUserEmail,
        password: registeredUserPassword,
      } = registeredUser;

      // check password
      const isSame = await bcrypt.compare(password, registeredUserPassword);
      if (!isSame) return next(WRONG_EMAIL_PASSWORD);

      // create access token
      const token = await generateAccessToken(registeredUserId, registeredUserEmail);
      // generate and store refresh token to cookies
      await putRefreshTokenToCookies(
        registeredUserId,
        registeredUserEmail,
        res,
      );

      console.log(`User ${registeredUserEmail} is Logged In`);

      res.status(200).json({ token });
    } catch (error) {
      console.log('error: login :>> ');
      console.dir(error);
      res.status(404).json(error);
    }
  }

  tokenRefresh: Middleware = async (req, res, next) => {
    try {
      // got decodedRefreshToken from auth validation middleware
      const { decodedRefreshToken } = req;
      const { userId, userEmail } = decodedRefreshToken as UserFromToken;

      // generate access token
      const token = await generateAccessToken(userId, userEmail);
      // generate and store refresh token to cookies
      await putRefreshTokenToCookies(
        userId,
        userEmail,
        res,
      );

      res.json({ token });
    } catch (error) {
      console.log('tokenRefresh error: >>');
      console.dir(error);
      next(error.message);
    }
  }
}

const authController = new AuthController();

export default authController;
