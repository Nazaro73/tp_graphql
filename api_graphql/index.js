require('dotenv').config({ path: '.env.local' });

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const {resolvers , typeDefs }= require('./graphql');
const sequelize = require('./utils/sequelize');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 3000 }, async () => {
    console.log(`Server ready at http://localhost:3000${server.graphqlPath}`);
    await sequelize.sync();
  });
}

startServer();