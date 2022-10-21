import delay from 'delay';
import * as http from 'http';
import * as stoppable from 'stoppable';

const logger = console;  //TODO: find suitable logger

export const handleDisaster = () => {
  // @ts-ignore
  process.on('uncaughtException', (err: Error) => {
    logger.error('An uncaught exception has happened', {err});
  });
  // @ts-ignore
  process.on('unhandledRejection', (err: Error | any) => {
    logger.error('handle disaster found uncaught rejection', {err});
  });
  // @ts-ignore
  process.on('warning', (err: Error) => {
    logger.warn('handle disaster found warning', {err});
  });
};


// @ts-ignore
export const handleGraceful = (server: http.Server, serviceName: string) => {
  const stoppableServer = stoppable(server);

  // @ts-ignore
  process.on('SIGTERM', async () => {
    const failureThreshold = 2;
    const periodSecond = 2;
    const gracePeriod = 2;

    await delay((failureThreshold * periodSecond + gracePeriod) * 1000);

    stoppableServer.stop(async (err, gracefully) => {
      logger.info(`${serviceName} is TERMINATED!`, {err, extra: {gracefully}});
      await delay(100);
      // @ts-ignore
      process.exit();
    });
  });
};
