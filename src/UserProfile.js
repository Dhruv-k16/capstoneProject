"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./UserProfile.css");
var navbar_1 = __importDefault(require("./navbar"));
var UserProfile = function (_a) {
    var userRole = _a.userRole, isLoggedIn = _a.isLoggedIn;
    var _b = (0, react_1.useState)('delete-address'), activeSection = _b[0], setActiveSection = _b[1];
    var _c = (0, react_1.useState)([
        {
            customer: 'Customer-A',
            street: 'Street: 25, A 1st Floor, Virwani Ind Estate, Goregaon (East)',
            city: 'Mumbai',
            stateProvince: 'Maharashtra',
            phone: '02266939762',
            zipCode: '400063',
            inUse: true,
        },
        {
            customer: 'Customer-A',
            street: 'Street: G-29/shree Vihal Complex, Ajwa Road, Opp Mahavir Hall, Ajwa Road',
            city: 'Vadodara',
            stateProvince: 'Gujarat',
            phone: '2464264',
            zipCode: '390019',
        },
    ]), addresses = _c[0], setAddresses = _c[1];
    var _d = (0, react_1.useState)(''), addressLine1 = _d[0], setAddressLine1 = _d[1];
    var _e = (0, react_1.useState)(''), addressLine2 = _e[0], setAddressLine2 = _e[1];
    var _f = (0, react_1.useState)(''), zipCode = _f[0], setZipCode = _f[1];
    var _g = (0, react_1.useState)(''), contactNumber = _g[0], setContactNumber = _g[1];
    var handleUseThis = function (index) {
        setAddresses(function (prevAddresses) {
            var updatedAddresses = prevAddresses.map(function (address, i) { return (__assign(__assign({}, address), { inUse: i === index })); });
            var usedAddress = updatedAddresses.splice(index, 1)[0];
            updatedAddresses.unshift(usedAddress);
            return updatedAddresses;
        });
    };
    var handleAddAddress = function () {
        // Implement logic to add the new address
        console.log({
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            zipCode: zipCode,
            contactNumber: contactNumber,
            userRole: userRole,
            isLoggedIn: isLoggedIn,
        });
        // You might want to clear the form after adding
        setAddressLine1('');
        setAddressLine2('');
        setZipCode('');
        setContactNumber('');
    };
    var handleDeleteAddress = function (index) {
        setAddresses(function (prevAddresses) { return prevAddresses.filter(function (_, i) { return i !== index; }); });
    };
    var getPageContent = function () {
        switch (activeSection) {
            case 'change-address':
                return ((0, jsx_runtime_1.jsxs)("div", { className: "user-profile-content", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Change Address" }), (0, jsx_runtime_1.jsx)("div", { className: "addresses", children: addresses.map(function (address, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "address-card", children: [(0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)("strong", { children: address.customer }) }), (0, jsx_runtime_1.jsx)("p", { children: address.street }), (0, jsx_runtime_1.jsxs)("p", { children: [address.city, ", ", address.stateProvince] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Phone: ", address.phone] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Zip code: ", address.zipCode] }), address.inUse ? ((0, jsx_runtime_1.jsx)("div", { className: "in-use", children: "in use" })) : ((0, jsx_runtime_1.jsx)("button", { className: "use-this-button", onClick: function () { return handleUseThis(index); }, children: "use this" }))] }, index)); }) })] }));
            case 'add-new-address':
                return ((0, jsx_runtime_1.jsxs)("div", { className: "user-profile-content", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Add Address" }), (0, jsx_runtime_1.jsxs)("div", { className: "add-address-form", children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { children: "ADDRESS" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "eg: Street- 25, A 1st Floor, Virwani Ind Estate, Goregaon (East)", value: addressLine1, onChange: function (e) { return setAddressLine1(e.target.value); } }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "eg: Mumbai, Maharashtra", value: addressLine2, onChange: function (e) { return setAddressLine2(e.target.value); } }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "eg: Zip code: 400063", value: zipCode, onChange: function (e) { return setZipCode(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { children: "Contact" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "+91", value: contactNumber, onChange: function (e) { return setContactNumber(e.target.value); } })] }), (0, jsx_runtime_1.jsx)("button", { className: "add-button", onClick: handleAddAddress, children: "ADD" })] })] }));
            case 'delete-address':
                return ((0, jsx_runtime_1.jsxs)("div", { className: "user-profile-content", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Delete Address" }), (0, jsx_runtime_1.jsx)("div", { className: "addresses", children: addresses.map(function (address, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "address-card", children: [(0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)("strong", { children: address.customer }) }), (0, jsx_runtime_1.jsx)("p", { children: address.street }), (0, jsx_runtime_1.jsxs)("p", { children: [address.city, ", ", address.stateProvince] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Phone: ", address.phone] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Zip code: ", address.zipCode] }), (0, jsx_runtime_1.jsx)("button", { className: "remove-button", onClick: function () { return handleDeleteAddress(index); }, children: "Remove" })] }, index)); }) })] }));
            default:
                return ((0, jsx_runtime_1.jsxs)("div", { className: "user-profile-content", children: [(0, jsx_runtime_1.jsx)("h1", { children: "User Profile" }), (0, jsx_runtime_1.jsx)("p", { children: "Select an option from the menu." })] }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "user-profile", children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "user-profile-content-wrapper", children: [(0, jsx_runtime_1.jsxs)("div", { className: "user-profile-sidebar", children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () { return setActiveSection('change-address'); }, children: "Change Address" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setActiveSection('add-new-address'); }, children: "Add New Address" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setActiveSection('delete-address'); }, children: "Delete Address" })] }), getPageContent()] })] }));
};
exports.default = UserProfile;
