import { gql } from "apollo-server";

const typeDefs = gql`
  type senderAddress {
    street: String
    city: String
    postCode: String
    country: String
  }

  type clientAddress {
    street: String
    city: String
    postCode: String
    country: String
  }

  type items {
    name: String
    quantity: Int
    price: Float
    total: Float
  }

  type Invoice {
    id: ID!
    createdAt: String
    paymentDue: String
    description: String
    paymentTerms: Int
    clientName: String
    clientEmail: String
    status: String
    senderAddress: senderAddress
    clientAddress: clientAddress
    items: [items]
    total: Float
  }

  type Query {
    getInvoices: [Invoice]
  }
`;

export default typeDefs;
