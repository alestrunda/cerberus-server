import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

//load environment variables
dotenv.config();

//use express framework
const app = express();

if (process.env.NODE_ENV === "development") {
  //automatically log all requests
  app.use(morgan("combined"));
}

//use body parser to get parameters from requests
app.use(bodyParser.json());

//serve static files
app.use(express.static(process.env.BACKGROUNDS_FOLDER))

//connect to db
try {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => {
    console.log("Connection to database successfull");
  });
} catch (e) {
  console.log("Cannot connect to database");
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
  debug: process.env.NODE_ENV === "development"
});
server.applyMiddleware({ app });

//start server
const port = process.env.PORT;
app.listen(port);
console.log(`Server running on http://localhost:${port}`);
