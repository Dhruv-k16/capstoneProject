"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_datepicker_1 = __importDefault(require("react-datepicker"));
require("react-datepicker/dist/react-datepicker.css");
require("./AddKitchen.css");
var navbar_1 = __importDefault(require("./navbar"));
var AddKitchen = function () {
    var _a = (0, react_1.useState)(null), selectedDate = _a[0], setSelectedDate = _a[1];
    var _b = (0, react_1.useState)(false), showThankYou = _b[0], setShowThankYou = _b[1];
    var _c = (0, react_1.useState)(''), cookName = _c[0], setCookName = _c[1];
    var _d = (0, react_1.useState)(''), gender = _d[0], setGender = _d[1];
    var _e = (0, react_1.useState)(''), address = _e[0], setAddress = _e[1];
    var _f = (0, react_1.useState)(''), landmark = _f[0], setLandmark = _f[1];
    var _g = (0, react_1.useState)(''), pincode = _g[0], setPincode = _g[1];
    var _h = (0, react_1.useState)(''), contactNo = _h[0], setContactNo = _h[1];
    var _j = (0, react_1.useState)(''), email = _j[0], setEmail = _j[1];
    var _k = (0, react_1.useState)(2), mealsPrepared = _k[0], setMealsPrepared = _k[1];
    var handleDateChange = function (date) {
        setSelectedDate(date);
    };
    var handleSubmit = function () {
        if (!cookName ||
            !gender ||
            !address ||
            !landmark ||
            !pincode ||
            !contactNo ||
            !email ||
            !selectedDate) {
            alert('Please fill in all the details.');
            return;
        }
        // Add logic to handle form submission here (e.g., send data to server)
        // ...
        setShowThankYou(true);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'addkitchen-page', children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "add-kitchen-container", children: [(0, jsx_runtime_1.jsx)("h1", { className: 'title', children: "ADD KITCHEN DETAILS" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "input-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "cookName", children: "HOME-MAKER NAME" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "cookName", value: cookName, onChange: function (e) { return setCookName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "input-group", children: [(0, jsx_runtime_1.jsx)("label", { children: "GENDER" }), (0, jsx_runtime_1.jsxs)("div", { className: "radio-group", children: [(0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "gender", value: "male", checked: gender === 'male', onChange: function () { return setGender('male'); } }), " MALE"] }), (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "gender", value: "female", checked: gender === 'female', onChange: function () { return setGender('female'); } }), " FEMALE"] }), (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "gender", value: "other", checked: gender === 'other', onChange: function () { return setGender('other'); } }), " OTHER"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "input-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "address", children: "ADDRESS" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "address", placeholder: "House number/Street name", value: address, onChange: function (e) { return setAddress(e.target.value); } }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Landmark/City/state", value: landmark, onChange: function (e) { return setLandmark(e.target.value); } }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Pincode", value: pincode, onChange: function (e) { return setPincode(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "input-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "contactNo", children: "CONTACT No." }), (0, jsx_runtime_1.jsxs)("div", { className: "contact-input", children: [(0, jsx_runtime_1.jsx)("span", { children: "+91" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "contactNo", maxLength: 10, value: contactNo, onChange: function (e) { return setContactNo(e.target.value); } })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "input-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "email", placeholder: 'abc@gmail.com', value: email, onChange: function (e) { return setEmail(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "input-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "mealsPrepared", children: "No. OF MEALS CAN BE PREPARED IN A DAY" }), (0, jsx_runtime_1.jsx)("div", { className: "meals-input", children: (0, jsx_runtime_1.jsx)("input", { type: "number", id: "mealsPrepared", defaultValue: 2, min: 2, value: mealsPrepared, onChange: function (e) { return setMealsPrepared(parseInt(e.target.value)); } }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "input-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "surveyDate", children: "SELECT DATE FOR SURVEY" }), (0, jsx_runtime_1.jsx)(react_datepicker_1.default, { selected: selectedDate, onChange: handleDateChange, dateFormat: "dd/MM/yyyy", className: "date-picker", placeholderText: 'DD/MM/YYYY' })] }), (0, jsx_runtime_1.jsx)("button", { className: "submit-button", onClick: handleSubmit, children: "SUBMIT" }), showThankYou && ((0, jsx_runtime_1.jsx)("p", { className: "thank-you-message", children: "Thank you for the information our Survey team will reach out to you soon!" }))] })] })] }));
};
exports.default = AddKitchen;
