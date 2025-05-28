"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./Signup.css");
var navbar_1 = __importDefault(require("./navbar"));
var Signup = function () {
    var _a = (0, react_1.useState)(''), name = _a[0], setName = _a[1];
    var _b = (0, react_1.useState)(''), email = _b[0], setEmail = _b[1];
    var _c = (0, react_1.useState)(''), contact = _c[0], setContact = _c[1];
    var _d = (0, react_1.useState)(''), password = _d[0], setPassword = _d[1];
    var _e = (0, react_1.useState)(''), rePassword = _e[0], setRePassword = _e[1];
    var _f = (0, react_1.useState)('Create account as'), role = _f[0], setRole = _f[1];
    var _g = (0, react_1.useState)(false), isDropdownOpen = _g[0], setIsDropdownOpen = _g[1];
    var dropdownRef = (0, react_1.useRef)(null);
    var navigate = (0, react_router_dom_1.useNavigate)();
    var roles = ['Customer', 'Delivery man'];
    var handleRoleSelect = function (selectedRole) {
        setRole(selectedRole);
        setIsDropdownOpen(false);
    };
    var handleClickOutside = function (event) {
        if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };
    (0, react_1.useEffect)(function () {
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    var handleSignup = function () {
        // Basic validation
        if (!name || !email || !contact || !password || password !== rePassword || role === 'Create account as') {
            alert('Please fill in all fields correctly.');
            return;
        }
        // **Replace this placeholder with your actual API call**
        // Example using fetch:
        // fetch('/api/signup', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ name, email, contact, password, role }),
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     if (data.success) {
        //       alert('Account Created Successfully!');
        //       navigate('/'); // Redirect to login page
        //     } else {
        //       alert('Signup failed. Please try again.');
        //     }
        //   })
        //   .catch((error) => {
        //     console.error('Signup error:', error);
        //     alert('An error occurred during signup.');
        //   });
        // **For now, simulate a successful signup:**
        alert('Account Created Successfully!');
        navigate('/'); // Redirect to login page
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'Signup-page', children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "signup-container", children: (0, jsx_runtime_1.jsxs)("div", { className: "signup-form", children: [(0, jsx_runtime_1.jsx)("h2", { children: (0, jsx_runtime_1.jsx)("u", { children: "Create Account" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "role-select", ref: dropdownRef, children: [(0, jsx_runtime_1.jsx)("button", { className: "role-button", onClick: function () { return setIsDropdownOpen(!isDropdownOpen); }, children: role }), isDropdownOpen && ((0, jsx_runtime_1.jsx)("div", { className: "role-dropdown", children: roles.map(function (optionRole) { return ((0, jsx_runtime_1.jsx)("button", { className: "role-option-signup", onClick: function () { return handleRoleSelect(optionRole); }, children: optionRole }, optionRole)); }) }))] }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "Enter Your Name" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "name", value: name, onChange: function (e) { return setName(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", id: "email", value: email, onChange: function (e) { return setEmail(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "contact", children: "Contact" }), (0, jsx_runtime_1.jsx)("input", { type: "tel", id: "contact", value: contact, onChange: function (e) { return setContact(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "password", children: "Create Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "password", value: password, onChange: function (e) { return setPassword(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "rePassword", children: "Re-enter Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "rePassword", value: rePassword, onChange: function (e) { return setRePassword(e.target.value); } }), (0, jsx_runtime_1.jsx)("button", { onClick: handleSignup, children: "Sign Up" })] }) })] }));
};
exports.default = Signup;
