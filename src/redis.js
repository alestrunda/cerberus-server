import redis from "redis";
import { promisify } from "util";

let client;
let getAsync = () => undefined;

const createClient = (args) => {
  const redisClient = redis.createClient(args);
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
  createClient,
  getClient,
};
