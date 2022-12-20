import { Db, Document, MongoClient, ReadPreference } from "mongodb";

import { logger } from "./logger";

const connectionsParameters = [
  {
    uri: "mongoUri",
    dbName: "mongoDb",
  },
];

let connections: {
  [dbName: string]: {
    db: Db;
    client: MongoClient;
  };
} = {};

const connect = ({uri, dbName}) =>
  MongoClient.connect(`${uri}/${dbName}`, {
    readPreference: ReadPreference.PRIMARY,
    ignoreUndefined: true,
  });

export const init = async () => {
  try {
    const connectResults = await Promise.all(
      connectionsParameters.map(async ({uri, dbName}) => {
        const client = await connect({uri, dbName});

        return {
          client,
          db: client.db(dbName),
        };
      })
    );

    connections = connectResults.reduce(
      (prev, value) => ({
        ...prev,
        [value.db.databaseName]: value,
      }),
      {}
    );

    logger.info(`connected to mongo`);
  } catch (err) {
    logger.error("couldn't connect to mongo", {err});
    throw new Error("couldn't connect to mongo");
  }
};

const getDb = (dbName: string): Db => connections[dbName].db;

export const getCollection = <T extends Document>(dbName: string, collectionName: string) => getDb(dbName).collection<T>(collectionName);

export const close = () => Promise.all(Object.values(connections).map(({client}) => client.close()));
