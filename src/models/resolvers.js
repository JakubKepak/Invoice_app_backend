import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getToken } from "../helpers/helpers";

import {
  UserInputError,
  AuthenticationError,
  ValidationError,
} from "apollo-server";
import User from "./User";

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

    async getInvoice(_, { input }, ctx) {
      try {
        const foundInvoice = await ctx.Invoice.findOne({ id: input.id });
        return foundInvoice;
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

    async updateInvoice(_, { input }, ctx) {
      try {
        const updatedInvoice = await ctx.Invoice.findOneAndUpdate(
          { id: input.id },
          { $set: input },
          { new: true }
        );
        return updatedInvoice;
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

    async loginUser(_, { input: { username, password } }, ctx) {
      const user = await ctx.User.findOne({ username });
      if (!user) throw new AuthenticationError("User does not exist");

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new AuthenticationError("incorrect password");

      const token = getToken(user);

      return {
        id: user._id,
        ...user._doc,
        token,
      };
    },

    async registerUser(_, { input: { username, password, email } }, ctx) {
      const user = await ctx.User.findOne({ username });
      if (user) throw new ValidationError("User is not valid");

      password = await bcrypt.hash(password, 10);
      const newUser = new ctx.User({
        username,
        password,
        email,
        created: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = getToken(res);

      return {
        id: res._id,
        ...res._doc,
        token,
      };
    },
  },
};

export default resolvers;
