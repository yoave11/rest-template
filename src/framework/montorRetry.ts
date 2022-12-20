// // import {Counter} from 'prom-client';
// import * as UrlValueParser from 'url-value-parser';
//
// // import {FetchRetryError, FetchTimeoutError} from 'fetch-enhancers';
//
// import {serviceName} from './environment';
// import { logger } from "./logger";
//
// // const retryCounter = new Counter({
// //   name: `${(serviceName).replace(/-/g, '_')}_retries`,
// //   help: `service retry counter`,
// //   labelNames: ['path', 'reason', 'attempt'],
// // });
//
// const parser = new UrlValueParser();
//
// export default (err: FetchRetryError) => {
//   try {
//     if (err.originalError instanceof FetchTimeoutError) {
//       logger.info(`retry occurred on ${serviceName} due to client timeout`, {
//         err,
//         extra: {retry: true, timeout: true},
//       });
//     } else {
//       logger.info(`retry occurred on ${serviceName}`, {err, extra: {retry: true}});
//     }
//     // retryCounter.inc({
//     //   path: parser.replacePathValues(new URL(err.url).pathname, '#val'),
//     //   reason: err.status ? err.status : 'client_timeout',
//     //   attempt: err.attempt,
//     // });
//   } catch (err) {
//     logger.warn('unexpected failure in monitorRetry', {err});
//   }
// };
