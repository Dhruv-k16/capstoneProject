"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./CustomerHome.css");
var navbar_1 = __importDefault(require("./navbar"));
var react_router_dom_1 = require("react-router-dom");
var UpdateDetails_1 = __importDefault(require("./UpdateDetails"));
var ChangePassword_1 = __importDefault(require("./ChangePassword"));
var Payment_1 = __importDefault(require("./Payment"));
var CustomerHome = function (_a) {
    var customerName = _a.customerName;
    var _b = (0, react_1.useState)(false), customerDropdown = _b[0], setCustomerDropdown = _b[1];
    var _c = (0, react_1.useState)(false), addressDropdown = _c[0], setAddressDropdown = _c[1];
    var _d = (0, react_1.useState)(null), openDropdownId = _d[0], setOpenDropdownId = _d[1];
    var _e = (0, react_1.useState)([
        { id: 1, name: 'Home-maker A', location: '3 km Away', rating: 5 },
        { id: 2, name: 'Home-maker B', location: '5 km Away', rating: 4.8 },
    ]), homeMakers = _e[0], setHomeMakers = _e[1];
    var _f = (0, react_1.useState)([
        { id: 101, name: 'Matar Paneer', imageUrl: './images/Matar Paneer.jpeg', price: 80 },
        { id: 102, name: 'Daal Fry', imageUrl: './images/daal.jpeg', price: 60 },
        { id: 103, name: 'Jeera Rice', imageUrl: './images/Jeera Rice.jpeg', price: 50 },
        { id: 104, name: 'Ghee Roti', imageUrl: './images/chapati.jpeg', price: 30 },
    ]), homeMakerMenu = _f[0], setHomeMakerMenu = _f[1];
    var _g = (0, react_1.useState)(null), selectedButtonId = _g[0], setSelectedButtonId = _g[1];
    var _h = (0, react_1.useState)(1), mealQuantity = _h[0], setMealQuantity = _h[1];
    var _j = (0, react_1.useState)([]), cartItems = _j[0], setCartItems = _j[1];
    var _k = (0, react_1.useState)(0), totalPrice = _k[0], setTotalPrice = _k[1];
    var customerDropdownRef = (0, react_1.useRef)(null);
    var addressDropdownRef = (0, react_1.useRef)(null);
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleClickOutside = function (event) {
        if (customerDropdownRef.current && event.target instanceof Node && !customerDropdownRef.current.contains(event.target)) {
            setCustomerDropdown(false);
        }
        if (addressDropdownRef.current && event.target instanceof Node && !addressDropdownRef.current.contains(event.target)) {
            setAddressDropdown(false);
        }
        if (openDropdownId !== null && event.target instanceof Node) {
            var dropdownElement = document.querySelector(".meal-dropdown-container-".concat(openDropdownId));
            var selectButton = document.querySelector(".select-button-".concat(openDropdownId));
            if (dropdownElement && !dropdownElement.contains(event.target) && selectButton && !selectButton.contains(event.target)) {
                setOpenDropdownId(null);
                setSelectedButtonId(null);
            }
        }
    };
    (0, react_1.useEffect)(function () {
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdownId]);
    (0, react_1.useEffect)(function () {
        setCartItems([]);
        setTotalPrice(0);
    }, []);
    var toggleMealDropdown = function (homeMakerId) {
        if (openDropdownId === homeMakerId) {
            setOpenDropdownId(null);
            setSelectedButtonId(null);
        }
        else {
            setOpenDropdownId(homeMakerId);
            setSelectedButtonId(homeMakerId);
        }
    };
    var getSelectButtonStyle = function (homeMakerId) {
        return openDropdownId === homeMakerId ? { backgroundColor: '#d0bba5' } : {};
    };
    var handleIncrement = function () {
        setMealQuantity(mealQuantity + 1);
    };
    var handleDecrement = function () {
        setMealQuantity(Math.max(mealQuantity - 1, 1));
    };
    var addToCart = function (meals, quantity) {
        var newCartItems = [];
        var newTotalPrice = 0;
        meals.forEach(function (meal) {
            newCartItems.push({ meal: meal, quantity: quantity });
            newTotalPrice += meal.price * quantity;
        });
        setCartItems(function (prevCartItems) { return __spreadArray(__spreadArray([], prevCartItems, true), newCartItems, true); });
        setTotalPrice(function (prevTotalPrice) { return prevTotalPrice + newTotalPrice; });
    };
    var removeFromCart = function (index) {
        var updatedCartItems = __spreadArray([], cartItems, true);
        var removedItem = updatedCartItems.splice(index, 1)[0];
        setCartItems(updatedCartItems);
        setTotalPrice(function (prevTotal) { return prevTotal - removedItem.meal.price * removedItem.quantity; });
    };
    var handlePay = function () {
        navigate('/payment', { state: { totalPrice: totalPrice } });
    };
    var handleUpdateDetails = function () {
        navigate('/update-details');
    };
    var handleChangePassword = function () {
        navigate('/change-password');
    };
    var handleLogout = function () {
        navigate('/');
    };
    var handleChangeAddress = function () {
        navigate('/user-profile/change-address');
    };
    var handleAddNewAddress = function () {
        navigate('/user-profile/add-new-address');
    };
    var handleDeleteAddress = function () {
        navigate('/user-profile/delete-address');
    };
    var handleOrdersClick = function () {
        navigate('/orders');
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "customer-home-page", children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "top-area", children: [(0, jsx_runtime_1.jsxs)("div", { className: "customer-dropdown-container", ref: customerDropdownRef, children: [(0, jsx_runtime_1.jsxs)("button", { className: "customer-button", onClick: function () { return setCustomerDropdown(!customerDropdown); }, children: [(0, jsx_runtime_1.jsx)("img", { src: "./images/icons/user.png", alt: "Profile", className: "button-icon" }), customerName || 'Customer'] }), customerDropdown && ((0, jsx_runtime_1.jsxs)("div", { className: "customer-dropdown", children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleUpdateDetails, children: "Update Details" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleChangePassword, children: "Change Password" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleLogout, children: "Logout" })] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "search-bar", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Search..." }), (0, jsx_runtime_1.jsx)("button", { children: (0, jsx_runtime_1.jsx)("img", { src: "./images/icons/search.png", alt: "Search", className: "search-icon" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "address-dropdown-container", ref: addressDropdownRef, children: [(0, jsx_runtime_1.jsxs)("button", { className: "address-button", onClick: function () { return setAddressDropdown(!addressDropdown); }, children: [(0, jsx_runtime_1.jsx)("img", { src: "./images/icons/location.png", alt: "Location", className: "button-icon" }), "Address"] }), addressDropdown && ((0, jsx_runtime_1.jsxs)("div", { className: "address-dropdown", children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleChangeAddress, children: "Change Address" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleAddNewAddress, children: "Add New Address" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleDeleteAddress, children: "Delete Address" })] }))] })] }), (0, jsx_runtime_1.jsx)("div", { className: "offers-runner", children: "Offers runner (Optional)" }), (0, jsx_runtime_1.jsxs)("div", { className: "content-area", children: [(0, jsx_runtime_1.jsxs)("div", { className: "left-panel", children: [(0, jsx_runtime_1.jsxs)("div", { className: "orders-section", children: [(0, jsx_runtime_1.jsx)("button", { className: "orders-button", onClick: handleOrdersClick, children: "ORDERS" }), (0, jsx_runtime_1.jsx)("button", { className: "subscription-button", children: "SUBSCRIPTION" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "cart-section", children: [(0, jsx_runtime_1.jsx)("div", { className: "cart-title", children: "CART" }), (0, jsx_runtime_1.jsx)("div", { className: "cart-items", children: cartItems.map(function (item, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "cart-item", children: [(0, jsx_runtime_1.jsxs)("p", { children: [item.meal.name, " x", item.quantity, " : Rs. ", item.meal.price * item.quantity] }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return removeFromCart(index); }, className: "remove-button", children: "Remove" })] }, index)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "cart-total", children: [(0, jsx_runtime_1.jsx)("button", { className: "pay-button", onClick: handlePay, children: "PAY" }), (0, jsx_runtime_1.jsxs)("p", { children: ["Total Rs. ", totalPrice] })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "middle-panel", children: homeMakers.map(function (homeMaker) { return ((0, jsx_runtime_1.jsxs)("div", { className: "cook-info", children: [(0, jsx_runtime_1.jsxs)("div", { className: "cook-details", children: [(0, jsx_runtime_1.jsx)("img", { src: "./images/chef.jpeg", alt: homeMaker.name }), (0, jsx_runtime_1.jsxs)("div", { className: "cook-text", children: [(0, jsx_runtime_1.jsxs)("p", { children: ["Home-maker : ", homeMaker.name] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Distance : ", homeMaker.location] }), (0, jsx_runtime_1.jsx)("p", { children: "Orders Left : n/n" }), (0, jsx_runtime_1.jsx)("div", { className: "rating", children: Array.from({ length: homeMaker.rating }).map(function (_, index) { return ((0, jsx_runtime_1.jsx)("span", { children: "\u2605" }, index)); }) })] })] }), (0, jsx_runtime_1.jsx)("button", { className: "select-button select-button-".concat(homeMaker.id), onClick: function () { return toggleMealDropdown(homeMaker.id); }, style: getSelectButtonStyle(homeMaker.id), children: openDropdownId === homeMaker.id ? 'close' : 'select' }), (0, jsx_runtime_1.jsx)("div", { className: "meal-dropdown-container meal-dropdown-container-".concat(homeMaker.id), children: openDropdownId === homeMaker.id && ((0, jsx_runtime_1.jsxs)("div", { className: "meal-dropdown", children: [(0, jsx_runtime_1.jsx)("div", { className: "meal-grid", children: homeMakerMenu.map(function (meal) { return ((0, jsx_runtime_1.jsxs)("div", { className: "meal-card", children: [(0, jsx_runtime_1.jsx)("img", { src: meal.imageUrl, alt: meal.name }), (0, jsx_runtime_1.jsx)("p", { children: meal.name })] }, meal.id)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "add-meal-quantity", children: [(0, jsx_runtime_1.jsx)("button", { className: "add-meal-button", onClick: function () { return addToCart(homeMakerMenu, mealQuantity); }, children: "ADD MEAL" }), (0, jsx_runtime_1.jsxs)("div", { className: "quantity-control", children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleDecrement, children: "-" }), (0, jsx_runtime_1.jsx)("span", { children: mealQuantity }), (0, jsx_runtime_1.jsx)("button", { onClick: handleIncrement, children: "+" })] })] })] })) })] }, homeMaker.id)); }) })] })] }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/update-details", element: (0, jsx_runtime_1.jsx)(UpdateDetails_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/change-password", element: (0, jsx_runtime_1.jsx)(ChangePassword_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/payment", element: (0, jsx_runtime_1.jsx)(Payment_1.default, { totalPrice: totalPrice }) })] })] }));
};
exports.default = CustomerHome;
