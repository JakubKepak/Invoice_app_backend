import { gql } from "apollo-server";

const typeDefs = gql`
  # ENUMS
  enum statusType {
    PAID
    PENDING
    DRAFT
  }

  # Types

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
  }

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
    status: statusType
    senderAddress: senderAddress
    clientAddress: clientAddress
    items: [items]
    total: Float
  }

  # input types

  input RegisterUserInput {
    username: String!
    password: String!
    email: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input NewSenderAddressInput {
    street: String
    city: String
    postCode: String
    country: String
  }

  input NewClientAddressInput {
    street: String
    city: String
    postCode: String
    country: String
  }

  input NewItemsInput {
    name: String
    quantity: Int
    price: Float
    total: Float
  }

  input NewInvoiceInput {
    id: ID!
    createdAt: String
    paymentDue: String
    description: String
    paymentTerms: Int
    clientName: String
    clientEmail: String
    status: statusType
    senderAddress: NewSenderAddressInput
    clientAddress: NewClientAddressInput
    items: [NewItemsInput]
    total: Float
  }

  input InvoiceID {
    id: ID!
  }

  type Query {
    getInvoices: [Invoice]
    getInvoice(input: InvoiceID!): Invoice!
  }
  type Mutation {
    createInvoice(input: NewInvoiceInput): Invoice!
    updateInvoice(input: NewInvoiceInput): Invoice!
    deleteInvoice(input: InvoiceID): Invoice!
    loginUser(input: LoginInput): User!
    registerUser(input: RegisterUserInput): User!
  }
`;

export default typeDefs;
