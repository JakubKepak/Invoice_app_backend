const resolvers = {
  Query: {
    // First argument _ is top level resolver. In this case getInvoices is
    // top level resolver so that's whyy I put _ as argument. We can call it root level resolver
    // Second argument __ is arguments. This allows clients send up arguments to
    // queries or mutation like pagination etc.
    // Thisrd argument is context. Here I access Invoices model from mongoose
    async getInvoices(_, __, ctx) {
      try {
        const invoices = await ctx.Invoice.find();
        return invoices;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  // Basically same as Query type but purpose is to mutate data at the source. In this case MongoDB
  Mutation: {
    async createInvoice(_, { input }, ctx) {
      try {
        const newInvoice = new ctx.Invoice(input);
        const res = await newInvoice.save();
        return newInvoice;
      } catch (err) {
        throw new Error(err);
      }
    },

    async deleteInvoice(_, { input }, ctx) {
      try {
        const deletedInvoice = await ctx.Invoice.findOneAndDelete({
          id: input.id,
        });
        console.log(deletedInvoice);
        return deletedInvoice;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default resolvers;
