import {NextFunction, Request, Response} from 'express';
import { logger } from "../logger";

export const createErrorHandler = (serviceName: string) => (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || `error occurred ${serviceName}`;
  const extra: any = {
    fields: err.fields || undefined,
    name: err.name,
    message,
    status,
    type: err.type || 'Unknown',
    body: req.body,
    query: req.query,
    clientHeaders: {
      name: req.headers['x-api-client'],
      version: req.headers['x-api-client-version']
    },
    requestUrl: req.url
  };
  if (status === 400 || status === 403 || status === 404) {
    logger.info(message, {err, extra});
  } else {
    logger.error(message, {err, extra});
  }
  res.status(status).json(extra);
  next();
};
