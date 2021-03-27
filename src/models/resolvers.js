const resolvers = {
  Query: {
    async getInvoices(_, __, ctx) {
      try {
        const invoices = await ctx.Invoice.find();
        return invoices;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default resolvers;
