import "regenerator-runtime/runtime.js";
import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import typeDefs from "./models/typeDefs";
import resolvers from "./models/resolvers";

// Schemas
import Invoice from "./models/Invoice";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    return { Invoice };
  },
  introspection: true,
  playground: true,
});

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true })
  .then(() => {
    console.log("db connected");
    return server.listen({ port: process.env.PORT || 5000 });
  })
  .then((res) => {
    console.log(`Server is running on port ${res.url}`);
  });
