"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var invoiceSchema = new _mongoose.Schema({
  id: String,
  createdAt: String,
  description: String
});

var _default = (0, _mongoose.model)("Invoice", invoiceSchema);

exports["default"] = _default;
//# sourceMappingURL=Invoice.js.map