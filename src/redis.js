import { createClient } from "redis";

let client;
let getAsync = () => undefined;

const createRedisClient = async (args) => {
  const redisClient = createClient(args);
  redisClient.on("error", (error) => {
    client = createDummyClient();
    console.error(error);
  });
  redisClient.on("ready", () => {
    console.log("Redis ready");
    client = redisClient;
  });
  await redisClient.connect();
};

const createDummyClient = () => ({
  set: () => {},
});

const getClient = () => client;

export default {
  createClient: createRedisClient,
  getClient,
};
