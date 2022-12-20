import {  createClient } from "redis";

export class RedisMap {
  private readonly cache;

  constructor() {
    this.cache = createClient({
    });

    this.cache.on("connect", () => {
      console.log(`Redis connection established`);
    });

    this.cache.on("error", (error) => {
      console.error(`Redis error, service degraded: ${error}`);
    });
  }

  async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    // [3] if we're not connected to redis, bypass cache
    if (!this.cache.connected) {
      return await fetcher();
    }

    return new Promise((resolve, reject) => {
      this.cache.get(key, async (err, value) => {
        if (err) return reject(err);
        if (value) {
          // [4] if value is found in cache, return it
          return resolve(JSON.parse(value));
        }

        // [5] if value is not in cache, fetch it and return it
        const result = await fetcher();
        this.cache.set(
          key,
          JSON.stringify(result),
          "EX",
          (err, reply) => {
            if (err) return reject(err);
          }
        );
        return resolve(result);
      });
    });
  }

  // [6]
  del(key: string) {
    this.cache.del(key);
  }

  flush() {
    this.cache.flushall();
  }
}
