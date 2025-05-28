"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./Orders.css");
var navbar_1 = __importDefault(require("./navbar"));
var react_router_dom_1 = require("react-router-dom");
var Orders = function () {
    var _a = (0, react_1.useState)([]), orders = _a[0], setOrders = _a[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(function () {
        // Replace with your actual data fetching logic
        var fetchedOrders = [
            {
                id: 1,
                homeMaker: 'HOMEMAKER:',
                meals: 'Meal: panner, jeera rice, Ghee roti, daal fry',
                others: 10,
                total: 110,
                date: new Date('2025-10-12T10:00:00'),
                status: 'delivery',
            },
            {
                id: 2,
                homeMaker: 'HOMEMAKER:',
                meals: 'Meal: panner, jeera rice, Ghee roti, daal fry',
                others: 10,
                total: 110,
                date: new Date('2025-10-11T12:00:00'),
                status: 'preparing',
            },
            {
                id: 3,
                homeMaker: 'HOMEMAKER:',
                meals: 'Meal: panner, jeera rice, Ghee roti, daal fry',
                others: 10,
                total: 110,
                date: new Date('2025-10-10T14:00:00'),
                status: 'completed',
            },
            {
                id: 4,
                homeMaker: 'HOMEMAKER:',
                meals: 'Meal: panner, jeera rice, Ghee roti, daal fry',
                others: 10,
                total: 110,
                date: new Date('2025-10-09T16:00:00'),
                status: 'delivered',
            },
        ];
        var sortedOrders = fetchedOrders.sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
        setOrders(sortedOrders);
    }, []);
    var handleTrackOrder = function (orderId) {
        navigate("/track-order/".concat(orderId));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "orders-page", children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "orders-container", children: [(0, jsx_runtime_1.jsx)("h1", { children: "YOUR ORDERS" }), (0, jsx_runtime_1.jsx)("div", { className: "orders-list", children: orders.map(function (order) { return ((0, jsx_runtime_1.jsxs)("div", { className: "order-item", children: [(0, jsx_runtime_1.jsxs)("div", { className: "order-details", children: [(0, jsx_runtime_1.jsx)("p", { children: order.homeMaker }), (0, jsx_runtime_1.jsx)("p", { children: order.meals }), (0, jsx_runtime_1.jsxs)("p", { children: ["Others: Rs. ", order.others] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Total: Rs. ", order.total] })] }), (0, jsx_runtime_1.jsx)("div", { className: "order-date", children: order.date.toLocaleDateString() }), order.id === orders[0].id &&
                                    (order.status === 'preparing' || order.status === 'delivery') && ((0, jsx_runtime_1.jsx)("button", { className: "track-button", onClick: function () { return handleTrackOrder(order.id); }, children: "Track Order" }))] }, order.id)); }) })] })] }));
};
exports.default = Orders;
