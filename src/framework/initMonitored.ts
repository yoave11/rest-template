import { Monitor, PrometheusPlugin, setGlobalInstance, StatsdPlugin } from "monitored";

import { nodeEnv, serviceName } from "./environment";
import { logger } from "./logger";

export default () => {
  if (nodeEnv !== 'production') {
    return;
  }

  setGlobalInstance(
    new Monitor({
      logging: {
        logger,
        logErrorsAsWarnings: true,
      },
      plugins: [
        new StatsdPlugin({
          serviceName,
          apiKey: 'key',
          host: 'host',
          root: 'root',
        }),
        new PrometheusPlugin({}),
      ],

      shouldMonitorExecutionStart: true,
    })
  );
};
