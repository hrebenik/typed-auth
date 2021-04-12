import authController from '../controllers/authController';

import { refreshTokenValidation, validateLogFields, validateRegFields } from '../middlewares/auth/validateFields';

const { Router } = require('express');

const authRouter = Router();

authRouter.post('/register', [validateRegFields], authController.registration);
authRouter.post('/login', [validateLogFields], authController.login);
authRouter.get('/refresh_token', [refreshTokenValidation], authController.tokenRefresh);

export default authRouter;
