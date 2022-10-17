import {NextFunction} from 'connect';
import {Request, Response} from 'express';

export const createEnforceClientHeaders = (nodeEnv: string) => (req: Request, res: Response, next: NextFunction) => {
  if (nodeEnv !== 'production') {
    next();
    return;
  }
  if (!req.headers['x-api-client']) {
    res.status(400).send('missing x-api-client');
    return;
  }
  if (!req.headers['x-api-client-version']) {
    res.status(400).send('missing x-api-client-version');
    return;
  }
  next();
};
