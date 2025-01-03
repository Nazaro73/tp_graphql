const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const sequelize = require('./utils/sequelize');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, async () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    await sequelize.sync();
    console.log('Database synced');
  });
}

startServer();

