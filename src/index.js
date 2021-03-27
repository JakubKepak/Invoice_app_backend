import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import typeDefs from "./models/typeDefs";
import resolvers from "./models/resolvers";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
