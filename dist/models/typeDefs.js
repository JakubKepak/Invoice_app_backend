"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServer = require("apollo-server");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServer.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  type Invoice {\n    id: String!\n    createdAt: String!\n    description: String!\n  }\n\n  type Query {\n    getInvoices: [Invoice]\n  }\n"])));
var _default = typeDefs;
exports["default"] = _default;
//# sourceMappingURL=typeDefs.js.map