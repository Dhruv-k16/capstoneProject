"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
require("./UploadPage.css"); // Create this CSS file
var UploadPage = function () {
    var _a;
    var location = (0, react_router_dom_1.useLocation)();
    var uploadType = (_a = location.state) === null || _a === void 0 ? void 0 : _a.uploadType;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "upload-page", children: [(0, jsx_runtime_1.jsxs)("h2", { children: ["Upload ", uploadType.toUpperCase(), " Documents"] }), uploadType === 'personal' && (0, jsx_runtime_1.jsx)("p", { children: "Upload your personal documents here." }), uploadType === 'vehicle' && (0, jsx_runtime_1.jsx)("p", { children: "Upload your vehicle details here." }), uploadType === 'bank' && (0, jsx_runtime_1.jsx)("p", { children: "Upload your bank account details here." }), uploadType === 'emergency' && (0, jsx_runtime_1.jsx)("p", { children: "Upload your emergency contact details here." })] }));
};
exports.default = UploadPage;
