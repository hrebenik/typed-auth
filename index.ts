// plugins
import dotenv from 'dotenv';
import express from 'express';
// routes
import authRouter from './routes/authRoutes';
// middlewares
import errorHandler from './middlewares/errorMiddleware';

const mongoose = require('mongoose');

const cors = require('cors');
const cookieParser = require('cookie-parser');

// create application
const app = express();

// get .env information
dotenv.config();

// default middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use('/auth', authRouter);

// last error handler middleware
app.use(errorHandler);

// start function
const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening at http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log('error :>> ', error);
  }
};

startServer();
