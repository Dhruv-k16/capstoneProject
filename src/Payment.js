"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./Payment.css");
var navbar_1 = __importDefault(require("./navbar"));
var Payment = function (_a) {
    var totalPrice = _a.totalPrice, userRole = _a.userRole, isLoggedIn = _a.isLoggedIn;
    var _b = (0, react_1.useState)(null), selectedPayment = _b[0], setSelectedPayment = _b[1];
    var _c = (0, react_1.useState)(''), upiId = _c[0], setUpiId = _c[1];
    var _d = (0, react_1.useState)(false), showUpiInput = _d[0], setShowUpiInput = _d[1];
    var handlePaymentClick = function (payment) {
        setSelectedPayment(payment);
        setShowUpiInput(payment === 'UPI');
    };
    var handlePay = function () {
        if (selectedPayment === 'Cash on Delivery') {
            alert("Order confirmed. Total amount to be paid: Rs. ".concat(totalPrice));
        }
        else if (selectedPayment === 'UPI') {
            if (upiId) {
                alert("Order confirmed. Total amount paid: Rs. ".concat(totalPrice));
            }
            else {
                alert('Please enter your UPI ID.');
            }
        }
        else {
            alert('Please select a payment method.');
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "payment-page", children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "payment-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "payment-method", children: [(0, jsx_runtime_1.jsx)("h1", { children: "PAYMENT METHOD" }), (0, jsx_runtime_1.jsxs)("button", { className: "payment-option ".concat(selectedPayment === 'Cash on Delivery' ? 'selected' : ''), onClick: function () { return handlePaymentClick('Cash on Delivery'); }, children: ["CASH ON DELIVERY", (0, jsx_runtime_1.jsx)("span", { className: "arrow", children: (0, jsx_runtime_1.jsx)("img", { src: "./images/icons/arrow.png", alt: "arrow" }) })] }), (0, jsx_runtime_1.jsxs)("button", { className: "payment-option ".concat(selectedPayment === 'UPI' ? 'selected' : ''), onClick: function () { return handlePaymentClick('UPI'); }, children: ["UPI", (0, jsx_runtime_1.jsx)("span", { className: "arrow", children: (0, jsx_runtime_1.jsx)("img", { src: "./images/icons/arrow.png", alt: "arrow" }) })] }), showUpiInput && ((0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Enter UPI ID", value: upiId, onChange: function (e) { return setUpiId(e.target.value); }, className: "upi-input" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "total-price", children: ["Total to be paid: Rs. ", totalPrice] }), (0, jsx_runtime_1.jsx)("button", { className: "pay-button", onClick: handlePay, children: "PAY" })] })] }));
};
exports.default = Payment;
