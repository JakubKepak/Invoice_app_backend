import { gql } from "apollo-server";

import Invoice from "./Invoice";

const resolvers = {
  Query: {
    async getInvoices() {
      try {
        const invoices = await Invoice.find();
        return invoices;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default resolvers;
