# Cerberus Server

Web app to track my financial operations. Everyone should track incomes and expenses. The app tracks also debts and that's vital for freelancing.

This is the back-end part, there is also front-end "cerberus-client" using react. Backend is build on node.js - express and apollo - graphql. Data are stored in mongodb.

## How to set up the enviroment

You will need MongoDB database (I'm using MongoDB Atlas) and create .env file with corresponding values. Check .env.sample to see what to put it there, just set the ``DB_URL`` and ``DB_NAME``, no need to change other variables.

Or you can run mongoDB locally via Docker - see the section below.

## Docker

The server uses Redis and Mongo database, it's useful to run everything via docker-compose. The default ``Docker-compose.yml`` file does not include the database, it expects the db to be hosted somewhere else. To run everything locally use ``Docker-compose.local.yml`` - the docker command: `docker-compose -f Docker-compose.local.yml up`.

## Scripts

### `npm run develop`

Starts the server in development mode, printing all traffic in console.

### `npm run sample`

Feeds database with sample data. Check variables in file ``sampleDataGenerator.js`` to set how much sample data are to be created.

### `npm start`

Starts the server.
