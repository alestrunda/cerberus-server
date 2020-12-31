# Cerberus Server

Web app to track my financial operations. Everyone should track incomes and expenses. The app tracks also debts and that's vital for freelancing.

This is the back-end part, there is also front-end "cerberus-client" using react. Backend is build on node.js - express and apollo - graphql. Data are stored in mongodb.

## How to set up the enviroment

You will need mongoDB database (I used mlab) and create .env file with corresponding values. Check .env-sample to see what to put it there, just set the ``DB_URL`` and ``DB_NAME``, no need to change other variables.

## Scripts

### `npm run develop`

Starts the server in development mode, printing all traffic in console.

### `npm run sample`

Feeds database with sample data. Check variables in file ``sampleDataGenerator.js`` to set how much sample data are to be created.

### `npm start`

Starts the server.
