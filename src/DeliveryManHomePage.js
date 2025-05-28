"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// DeliveryManHomePage.tsx
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./DeliveryManHomePage.css"); // Create this CSS file
var DeliveryManHomePage = function (_a) {
    var deliveryManName = _a.deliveryManName;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _b = (0, react_1.useState)(false), isUploadComplete = _b[0], setIsUploadComplete = _b[1]; // Track upload completion
    var handleUploadClick = function (uploadType) {
        navigate('/upload', { state: { uploadType: uploadType } }); // Pass uploadType to upload page
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "delivery-man-home", children: [(0, jsx_runtime_1.jsxs)("div", { className: "top-panel", children: [(0, jsx_runtime_1.jsxs)("button", { className: "delivery-man-button", children: ["Delivery Man: ", deliveryManName] }), (0, jsx_runtime_1.jsx)("button", { className: "view-order-button", disabled: !isUploadComplete, children: "View Order" }), (0, jsx_runtime_1.jsx)("button", { className: "income-button", disabled: !isUploadComplete, children: "Income" }), (0, jsx_runtime_1.jsx)("button", { className: "address-button", children: "Address" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "upload-documents-panel", children: [(0, jsx_runtime_1.jsx)("h2", { children: "UPLOAD DOCUMENTS" }), (0, jsx_runtime_1.jsxs)("button", { className: "upload-button", onClick: function () { return handleUploadClick('personal'); }, children: ["PERSONAL DOCUMENTS ", (0, jsx_runtime_1.jsx)("img", { src: "./images/icons/arrow.png" })] }), (0, jsx_runtime_1.jsxs)("button", { className: "upload-button", onClick: function () { return handleUploadClick('vehicle'); }, children: ["VEHICLE DETAILS ", (0, jsx_runtime_1.jsx)("img", { src: "./images/icons/arrow.png" })] }), (0, jsx_runtime_1.jsxs)("button", { className: "upload-button", onClick: function () { return handleUploadClick('bank'); }, children: ["BANK ACCOUNT DETAILS ", (0, jsx_runtime_1.jsx)("img", { src: "./images/icons/arrow.png" })] }), (0, jsx_runtime_1.jsxs)("button", { className: "upload-button", onClick: function () { return handleUploadClick('emergency'); }, children: ["EMERGENCY DETAILS ", (0, jsx_runtime_1.jsx)("img", { src: "./images/icons/arrow.png" })] })] })] }));
};
exports.default = DeliveryManHomePage;
