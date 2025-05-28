"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./UpdateDetails.css");
var navbar_1 = __importDefault(require("./navbar"));
var UpdateDetails = function (_a) {
    var userRole = _a.userRole, isLoggedIn = _a.isLoggedIn;
    var _b = (0, react_1.useState)(''), email = _b[0], setEmail = _b[1];
    var _c = (0, react_1.useState)(''), contact = _c[0], setContact = _c[1];
    var handleUpdate = function () {
        // Implement your update details logic here
        console.log('Updating details:', { email: email, contact: contact, userRole: userRole, isLoggedIn: isLoggedIn });
        // You might want to send this data to an API or update your state
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "update-details-page", children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "update-details-container", children: [(0, jsx_runtime_1.jsx)("h1", { children: "UPDATE DETAILS" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", id: "email", value: email, onChange: function (e) { return setEmail(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "contact", children: "Contact" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "contact", value: contact, onChange: function (e) { return setContact(e.target.value); } })] }), (0, jsx_runtime_1.jsx)("button", { className: "update-button", onClick: handleUpdate, children: "UPDATE" })] })] }));
};
exports.default = UpdateDetails;
