"use strict";

require("regenerator-runtime/runtime.js");

var _apolloServer = require("apollo-server");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _typeDefs = _interopRequireDefault(require("./models/typeDefs"));

var _resolvers = _interopRequireDefault(require("./models/resolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var server = new _apolloServer.ApolloServer({
  typeDefs: _typeDefs["default"],
  resolvers: _resolvers["default"],
  introspection: true,
  playground: true
});

_mongoose["default"].connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true
}).then(function () {
  console.log("db connected");
  return server.listen({
    port: process.env.PORT || 5000
  });
}).then(function (res) {
  console.log("Server is running on port ".concat(res.url));
});
//# sourceMappingURL=index.js.map