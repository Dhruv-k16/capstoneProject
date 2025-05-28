"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("./AboutUs.css");
var navbar_1 = __importDefault(require("./navbar"));
var AboutUs = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'page', children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "about-us-container", children: (0, jsx_runtime_1.jsxs)("div", { className: "about-us-content", children: [(0, jsx_runtime_1.jsx)("div", { className: "about-us-title", children: "About Us" }), (0, jsx_runtime_1.jsx)("p", { children: "At LunchWala, we connect talented homemakers with people seeking affordable, nutritious, home-cooked meals. Our platform empowers home chefs, promotes sustainability, and offers a healthy alternative to expensive restaurant food. We combine technology with community." }), (0, jsx_runtime_1.jsx)("p", { children: "Unlike typical food delivery apps, we focus on home-cooked meals, offering a structured, scalable, and digital-first solution that supports local kitchens and fosters community-driven food systems." }), (0, jsx_runtime_1.jsx)("p", { children: "Join us in reimagining how homemade food is shared and delivered\u2014fresh from local homes to your doorstep." })] }) })] }));
};
exports.default = AboutUs;
