import redis from "redis";
import { promisify } from "util";

let client, getAsync;

const createClient = (args) => {
  client = redis.createClient(args);
  getAsync = promisify(client.get).bind(client);
};

const getClient = () => ({
  client,
  getAsync,
});

export default {
  createClient,
  getClient,
};
