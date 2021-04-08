import { gql } from "apollo-server";
import { createTestServer } from "./helper";

const INVOICES = gql`
  {
    getInvoices {
      id
    }
  }
`;

describe("queries", () => {
  test("get invoices", async () => {
    const { query } = createTestServer({
      Invoice: {
        //   Mocking a find method of mongoose
        find: jest.fn(() => [{ id: 1 }, { id: 2 }]),
      },
    });

    const res = await query({ query: INVOICES });
    expect(res).toMatchSnapshot();
  });
});
