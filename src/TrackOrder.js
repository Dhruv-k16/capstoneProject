"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("./TrackOrder.css");
var navbar_1 = __importDefault(require("./navbar"));
var TrackOrder = function (_a) {
    var orderId = _a.orderId;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "track-order-page", children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "track-details", children: [(0, jsx_runtime_1.jsxs)("div", { className: "delivery-info", children: [(0, jsx_runtime_1.jsx)("img", { src: "/public/images/delivery.jpeg", alt: "Delivery", className: "delivery-icon" }), (0, jsx_runtime_1.jsx)("p", { children: "Delivery agent: AABC" }), (0, jsx_runtime_1.jsx)("p", { children: "Contact no.: XXXXXXXXXX" }), (0, jsx_runtime_1.jsx)("p", { children: "Your meal will be at your place in __ time" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "order-status", children: [(0, jsx_runtime_1.jsx)("p", { className: "status-label", children: "ORDER STATUS" }), (0, jsx_runtime_1.jsx)("div", { className: "status-item preparing", children: "Preparing Meal" }), (0, jsx_runtime_1.jsx)("div", { className: "status-item packing", children: "Packing the Meal" }), (0, jsx_runtime_1.jsx)("div", { className: "status-item delivery", children: "Out for Delivery" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "track-order-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "order-summary", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Order Summary" }), (0, jsx_runtime_1.jsx)("p", { children: "HOMEMAKER:" }), (0, jsx_runtime_1.jsx)("p", { children: "Meal: panner, jeera rice, Ghee roti, daal fry" }), (0, jsx_runtime_1.jsx)("p", { children: "Rs. 100" }), (0, jsx_runtime_1.jsx)("p", { children: "Others: Rs. 10" }), (0, jsx_runtime_1.jsx)("p", { children: "Total: Rs. 110" }), (0, jsx_runtime_1.jsx)("p", { children: "12/10/2025" })] }), (0, jsx_runtime_1.jsx)("div", { className: "map-container", children: (0, jsx_runtime_1.jsx)("img", { src: "./images/map.png", alt: "Map", className: "map-image" }) })] })] }));
};
exports.default = TrackOrder;
