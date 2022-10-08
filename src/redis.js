import { createClient } from "redis";
import { promisify } from "util";

let client;
let getAsync = () => undefined;

const createRedisClient = (args) => {
  const redisClient = createClient(args);
  redisClient.on("error", (error) => {
    client = createDummyClient();
    console.error(error);
  });
  redisClient.on("ready", () => {
    getAsync = promisify(redisClient.get).bind(redisClient);
    client = redisClient;
  });
};

const createDummyClient = () => ({
  set: () => {},
});

const getClient = () => ({
  client,
  getAsync,
});

export default {
  createClient: createRedisClient,
  getClient,
};
