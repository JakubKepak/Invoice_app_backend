import { gql } from "apollo-server";

const typeDefs = gql`
  type Invoice {
    id: String!
    createdAt: String!
    description: String!
  }

  type Query {
    getInvoices: [Invoice]
  }
`;

export default typeDefs;
