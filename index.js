const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const express = require("express");
const db = require("./db_config/database");
const schema = require("./graphql/schema");

(async function () {
  db();
  const app = express();

  const corsOptions = {
    //productionda ilk url domainimiz olacak, ikinci url kaldırılacak
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true,
  };
  app.use(cors(corsOptions));

  const server = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  await server.start();
  console.log("apollo server started");

  server.applyMiddleware({ app, path: "/graphql", cors: false });
  console.log("middle ware apllied succesfuly");

  app.listen({ port: 4000 }, () => {
    console.log("server is ready on port 4000/graphql");
  });
})();
