"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./ChangePassword.css");
var navbar_1 = __importDefault(require("./navbar"));
var ChangePassword = function (_a) {
    var userRole = _a.userRole, isLoggedIn = _a.isLoggedIn;
    var _b = (0, react_1.useState)(''), currentPassword = _b[0], setCurrentPassword = _b[1];
    var _c = (0, react_1.useState)(''), newPassword = _c[0], setNewPassword = _c[1];
    var _d = (0, react_1.useState)(''), confirmNewPassword = _d[0], setConfirmNewPassword = _d[1];
    var handleChangePassword = function () {
        // Implement your change password logic here
        console.log('Changing password:', { currentPassword: currentPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword, userRole: userRole, isLoggedIn: isLoggedIn });
        // You might want to send this data to an API or update your state
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "change-password-page", children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "change-password-container", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Change Password" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "currentPassword", children: "Current Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "currentPassword", value: currentPassword, onChange: function (e) { return setCurrentPassword(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "newPassword", children: "New Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "newPassword", value: newPassword, onChange: function (e) { return setNewPassword(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "confirmNewPassword", children: "Re-enter new password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "confirmNewPassword", value: confirmNewPassword, onChange: function (e) { return setConfirmNewPassword(e.target.value); } })] }), (0, jsx_runtime_1.jsx)("p", { className: "forgot-password", children: "Forgot password ?" }), (0, jsx_runtime_1.jsx)("button", { className: "change-button", onClick: handleChangePassword, children: "Change" })] })] }));
};
exports.default = ChangePassword;
