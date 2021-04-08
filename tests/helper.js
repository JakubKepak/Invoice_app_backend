import "regenerator-runtime/runtime.js";
import { ApolloServer } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import typeDefs from "../src/models/typeDefs";
import resolvers from "../src/models/resolvers";

export const createTestServer = (ctx) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false,
    mocks: true,
    context: () => ctx,
  });

  return createTestClient(server);
};
