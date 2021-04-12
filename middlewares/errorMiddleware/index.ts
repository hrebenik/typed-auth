import { NextFunction, Response } from 'express';
import { errorsDescription, UNKNOWN_ERROR } from './errorsDescription';
import { CustomRequest } from '../../customTypes';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err: string, req: CustomRequest, res: Response, next: NextFunction) => {
  if (errorsDescription[err]) {
    const { status, message } = errorsDescription[err];
    console.log('error message: ');
    console.log(message);
    res.status(status).send(JSON.stringify({ message }));
  } else {
    res
      .status(errorsDescription[UNKNOWN_ERROR].status)
      .send(JSON.stringify({ message: errorsDescription[UNKNOWN_ERROR].message }));
    console.log(err);
  }
};

export default errorHandler;
