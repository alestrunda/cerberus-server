import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import { ApolloServer } from "apollo-server-express";

import redis from "./redis";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

//load environment variables
dotenv.config();

(async function () {
  //use express framework
  const app = express();

  if (process.env.NODE_ENV === "development") {
    //automatically log all requests
    app.use(morgan("combined"));
  }

  //use body parser to get parameters from requests
  app.use(bodyParser.json());

  //serve static background images
  app.use(express.static(process.env.BACKGROUNDS_FOLDER));

  //init redis
  try {
    redis.createClient({
      url: "redis://redis:6379",
      retry_strategy: () => {}, //disallows redis to try to reconnect when connection failed
    });
  } catch (e) {
    console.error("Cannot connect to redis", e);
    process.exit(1);
  }

  //connect to db
  try {
    mongoose.connect(
      process.env.DB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (error) => {
        if (error) throw error;
        console.log("Connection to database successfull");
      }
    );
  } catch (e) {
    console.error("Cannot connect to mongodb", e);
    process.exit(1);
  }

  //set Mongoose to use the global promise library
  mongoose.Promise = global.Promise;

  //base route
  app.get("/", (req, res) => {
    res.send("Running!");
  });

  //create apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: process.env.NODE_ENV === "development",
  });
  await server.start();
  server.applyMiddleware({ app });

  //start server
  const port = process.env.PORT;
  app.listen(port);
  console.log(
    `Server running on http://localhost:${port} and graphQL http://localhost:${port}/graphql`
  );
})();
