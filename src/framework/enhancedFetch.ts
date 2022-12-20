// import nodeFetch from 'node-fetch';
//
// import {Fetch, withRetry, withThrow, withTimeout} from 'fetch-enhancers';
//
// import monitorRetry from './monitorRetry';
//
// export default withThrow(
//   withRetry(
//     withTimeout(nodeFetch as unknown as Fetch, {
//       timeout: {
//         requestTimeoutMs: 10000,
//       },
//     }),
//     {
//       retry: {
//         onRetry: monitorRetry,
//       },
//     }
//   )
// );
