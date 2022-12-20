import * as Redis from 'ioredis';

import {monitored} from 'monitored';

import {nodeEnv} from './environment';
import { logger } from "./logger";

let client: Redis.Redis;

interface ReconnectParams {
  delay: number;
  attempt: number;
}

export const initRedisClient = (port: number, host: string, password?: string) => {
  let redisOptions: Redis.RedisOptions = {};

  if (password && nodeEnv === 'production') {
    redisOptions = {
      password,
      tls: {},
    };
  }

  client = new Redis(port, host, redisOptions);

  client.on('error', (err: Error) => {
    logger.error('error on redis client', {err, extra: {host, port}});
  });

  client.on('connect', () => {
    logger.info('Redis client connect');
  });

  client.on('reconnecting', (params: ReconnectParams) => {
    logger.info('Redis client reconnecting', {extra: params});
  });
};

export const getClient = (): Redis.Redis => {
  if (!client) {
    throw new Error("redis client hasn't been initialized");
  }

  return client;
};

export const getAsync = (key: string) => monitored('redis.get', () => getClient().get(key)) as Promise<string | null>;
