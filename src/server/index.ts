import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import {nodeEnv, serviceName} from '../framework/environment';
import {RegisterRoutes} from './controllers/routes';
import {isAliveRouter} from "./routes/isAliveRoute";
import {createEnforceClientHeaders, createErrorHandler, httpLogger} from "../framework/middlewares";

const app = express();
app.disable('x-powered-by');
app.disable('etag');

app.use(isAliveRouter)
  .use(cors())
  .options('*', cors)
  .use(createEnforceClientHeaders(nodeEnv))
  .use(bodyParser.json({limit: '1mb'}))
  .use(compression())
  .use(httpLogger);

RegisterRoutes(app);

app.use(createErrorHandler(serviceName));

export default app;
