import redis from "redis";
import { promisify } from "util";

let client = {
  set: () => {},
};
let getAsync = () => undefined;

const createClient = (args) => {
  client = redis.createClient(args);
  client.on("error", (error) => {
    console.error(error);
  });
  client.on("ready", () => {
    getAsync = promisify(client.get).bind(client);
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
