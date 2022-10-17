import {AsyncRouter} from 'express-async-router';

const router = AsyncRouter();

let serverRunning = true;

const logger = console;
process.on('SIGTERM', () => {
  logger.info('got SIGTERM', {extra: {serverRunning}});
  serverRunning = false;
});

router.get('/isAlive', async (_, res) => {
  if (serverRunning) {
    return true;
  }
  res.status(500);
  return false;
});

export const isAliveRouter = router;
