import {httpPort, serviceName} from './framework/environment';
import app from './server';
import {handleDisaster, handleGraceful} from './framework/handleEvents';

(async () => {
  handleDisaster();
  const server = app.listen(httpPort, () => {
    console.info(`${serviceName} is RUNNING!`, {extra: {httpPort}});
  });

  handleGraceful(server, serviceName);
})().catch((err) => console.error('error caught at index', {err}));
