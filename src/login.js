"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./login.css");
var navbar_1 = __importDefault(require("./navbar"));
var Login = function (_a) {
    var onLoginSuccess = _a.onLoginSuccess;
    var _b = (0, react_1.useState)('Login as'), selectedRole = _b[0], setSelectedRole = _b[1];
    var _c = (0, react_1.useState)(false), isDropdownOpen = _c[0], setIsDropdownOpen = _c[1];
    var dropdownRef = (0, react_1.useRef)(null);
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _d = (0, react_1.useState)(''), email = _d[0], setEmail = _d[1];
    var _e = (0, react_1.useState)(''), password = _e[0], setPassword = _e[1];
    var roles = ['Customer', 'Home-maker', 'Delivery man', 'Admin'];
    var handleRoleSelect = function (role) {
        setSelectedRole(role);
        setIsDropdownOpen(false);
    };
    var handleClickOutside = function (event) {
        if (dropdownRef.current &&
            event.target instanceof Node &&
            !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };
    (0, react_1.useEffect)(function () {
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    var handleSignIn = function () {
        // **IMPORTANT: This is where you'd add your actual authentication logic.**
        // For now, let's simulate a successful login:
        if (email && password && selectedRole !== 'Login as') {
            var role = selectedRole.toLowerCase(); // Get the lowercase role
            onLoginSuccess(role, "User-".concat(email.split('@')[0])); // Simulate user name
            switch (selectedRole) {
                case 'Customer':
                    navigate('/customer-home');
                    break;
                case 'Home-maker':
                    navigate('/HomeMakerHomePage');
                    break;
                case 'Delivery man':
                    navigate('/DeliveryManHomePage');
                    break;
                case 'Admin':
                    navigate('/admin-home');
                    break;
                default:
                    navigate('/');
            }
        }
        else {
            alert('Please enter email, password, and select a role.');
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'login-page', children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: 'login-container', children: (0, jsx_runtime_1.jsxs)("div", { className: 'content-section', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'left-section', children: [(0, jsx_runtime_1.jsx)("div", { className: 'welcome-text', children: (0, jsx_runtime_1.jsx)("h1", { children: "Welcome to Lunch Box Initiative - Home-Cooked Goodness, Delivered Fresh!" }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'login-form', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'create-account-login-container', children: [(0, jsx_runtime_1.jsx)("div", { className: 'create-account', children: (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)("u", { children: "Login Here" }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'login-as-container', ref: dropdownRef, children: [(0, jsx_runtime_1.jsxs)("button", { className: 'login-as', onClick: function () { return setIsDropdownOpen(!isDropdownOpen); }, children: [selectedRole, (0, jsx_runtime_1.jsx)("img", { src: '/images/icons/user.png', alt: 'Login As', className: 'login-as-icon' })] }), isDropdownOpen && ((0, jsx_runtime_1.jsx)("div", { className: 'role-dropdown-login', children: roles.map(function (role) { return ((0, jsx_runtime_1.jsx)("button", { className: 'role-option-login', onClick: function () { return handleRoleSelect(role); }, children: role }, role)); }) }))] })] }), (0, jsx_runtime_1.jsx)("label", { htmlFor: 'email', className: 'input-label', children: "Email / Phone" }), (0, jsx_runtime_1.jsx)("input", { type: 'email', id: 'email', placeholder: 'abc@gmail.com / 926XXXXXXX', className: 'input-field', value: email, onChange: function (e) { return setEmail(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: 'password', className: 'input-label', children: "Password" }), (0, jsx_runtime_1.jsx)("input", { type: 'password', id: 'password', placeholder: '156sgjd@BH', className: 'input-field', value: password, onChange: function (e) { return setPassword(e.target.value); } }), (0, jsx_runtime_1.jsxs)("div", { className: 'button-group', children: [(0, jsx_runtime_1.jsx)("button", { className: 'sign-in-button', onClick: handleSignIn, children: "Sign in" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: '/signup', children: (0, jsx_runtime_1.jsx)("button", { className: 'sign-up-button', children: "Sign up" }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: 'new-user-text', children: (0, jsx_runtime_1.jsx)("p", { children: "\"New here? Create an account and order your first home-cooked meal today!\"" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'right-section', children: [(0, jsx_runtime_1.jsx)("div", { className: 'quote-text', children: (0, jsx_runtime_1.jsx)("p", { children: "\"Enjoy delicious, healthy, and affordable home-cooked meals, prepared with love by homemakers and delivered to individuals, offices, and organisations. Freshness guaranteed!\"" }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'food-images-container', children: [(0, jsx_runtime_1.jsx)("img", { src: '/images/mixed.jpeg', alt: 'Food 1' }), (0, jsx_runtime_1.jsx)("img", { src: '/images/Naan.jpeg', alt: 'Food 2' }), (0, jsx_runtime_1.jsx)("img", { src: '/images/Idly.jpeg', alt: 'Food 3' }), (0, jsx_runtime_1.jsx)("img", { src: '/images/chole_puri.jpeg', alt: 'Food 4' })] })] })] }) })] }));
};
exports.default = Login;
