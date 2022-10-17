import {Request, Response} from 'express';
import * as responseTime from 'response-time';

const logger = console;

export const httpLogger = responseTime(((req: Request, res: Response, time: number) => {
  logger.info('HTTP', {
    extra: {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      params: req.params,
      'response-time-ms': time
    }
  });
}) as responseTime.ResponseTimeFunction);
