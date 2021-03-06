import "regenerator-runtime/runtime.js";
import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import typeDefs from "./models/typeDefs";
import resolvers from "./models/resolvers";
import { getUserFromToken } from "./auth";

// Schemas
import Invoice from "./models/Invoice";
import User from "./models/User";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// context will be accessible to all resolvers.
// So when passing Invoice I can access it or mock it during testing
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const authUser = getUserFromToken(token);
    return { Invoice, User, authUser };
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
