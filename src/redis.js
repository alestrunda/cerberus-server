import redis from "redis";
import { promisify } from "util";

let client = {
  set: () => {},
};
let getAsync = () => undefined;

const createClient = (args) => {
  const redisClient = redis.createClient(args);
  redisClient.on("error", (error) => {
    console.error(error);
  });
  redisClient.on("ready", () => {
    getAsync = promisify(client.get).bind(client);
    client = redisClient;
  });
};

const getClient = () => ({
  client,
  getAsync,
});

export default {
  createClient,
  getClient,
};
