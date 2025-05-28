"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
require("./navbar.css");
var Navbar = function (_a) {
    var userRole = _a.userRole, isLoggedIn = _a.isLoggedIn;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleHomeClick = function () {
        if (isLoggedIn) {
            switch (userRole) {
                case 'customer':
                    navigate('/CustomerHome');
                    break;
                case 'admin':
                    navigate('/admin-home'); // Replace with your admin home route
                    break;
                case 'home-maker':
                    navigate('/HomeMakerHomepage'); // Replace with your home-maker home route
                    break;
                case 'deliveryman':
                    navigate('/deliveryman-home'); // Replace with your deliveryman home route
                    break;
                default:
                    navigate('/'); // Navigate to login if role is unknown or not logged in
            }
        }
        else {
            navigate('/'); // Navigate to login if not logged in
        }
    };
    return ((0, jsx_runtime_1.jsxs)("nav", { className: 'nav-bar', children: [(0, jsx_runtime_1.jsxs)("div", { className: "logo-area", children: [(0, jsx_runtime_1.jsx)("img", { src: "/images/logo.png", alt: "LunchWala Logo", className: "logo" }), (0, jsx_runtime_1.jsx)("span", { className: "logo-text", children: "LunchWala" })] }), (0, jsx_runtime_1.jsx)("div", { className: "header-section", children: (0, jsx_runtime_1.jsxs)("div", { className: "header", children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleHomeClick, className: "header-button-home", children: (0, jsx_runtime_1.jsx)("u", { children: "HOME" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/add-kitchen", className: "header-button", children: "ADD KITCHEN" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/help", className: "header-button", children: "HELP" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/about-us", className: "header-button", children: "ABOUT US" })] }) })] }));
};
exports.default = Navbar;
