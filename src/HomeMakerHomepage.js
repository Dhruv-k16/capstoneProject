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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
// HomeMakerHomepage.tsx
var react_1 = __importStar(require("react"));
var react_datepicker_1 = __importDefault(require("react-datepicker"));
require("react-datepicker/dist/react-datepicker.css");
require("./HomeMakerHomepage.css");
var navbar_1 = __importDefault(require("./navbar"));
var react_router_dom_1 = require("react-router-dom");
var HomeMakerHomepage = function () {
    var _a = (0, react_1.useState)(null), selectedDate = _a[0], setSelectedDate = _a[1];
    var _b = (0, react_1.useState)(false), isEditingMenu = _b[0], setIsEditingMenu = _b[1];
    var _c = (0, react_1.useState)(['Meal/menu', 'Meal/menu', 'Meal/menu', 'Meal/menu']), foodItems = _c[0], setFoodItems = _c[1];
    var _d = (0, react_1.useState)([null, null, null, null]), foodImages = _d[0], setFoodImages = _d[1];
    var _e = (0, react_1.useState)(0), mealPrice = _e[0], setMealPrice = _e[1];
    var _f = (0, react_1.useState)([
        { customerName: 'Alice', mealQuantity: 2, location: '123 Main St', paymentStatus: 'Paid' },
        { customerName: 'Bob', mealQuantity: 1, location: '456 Oak Ave', paymentStatus: 'Cash on Delivery' },
        { customerName: 'Charlie', mealQuantity: 3, location: '789 Pine Ln', paymentStatus: 'Paid' },
    ]), orders = _f[0], setOrders = _f[1];
    var _g = (0, react_1.useState)('Add Menu'), selectedFunction = _g[0], setSelectedFunction = _g[1];
    var _h = (0, react_1.useState)(false), homeMakerDropdown = _h[0], setHomeMakerDropdown = _h[1];
    var homeMakerDropdownRef = (0, react_1.useRef)(null);
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _j = (0, react_1.useState)(5), quantity = _j[0], setQuantity = _j[1];
    var _k = (0, react_1.useState)(false), isChangingQuantity = _k[0], setIsChangingQuantity = _k[1];
    var _l = (0, react_1.useState)(null), mealStatus = _l[0], setMealStatus = _l[1];
    var _m = (0, react_1.useState)([
        {
            customerName: 'Customer A',
            feedbackText: 'The [signature dish] was absolutely amazing! Perfectly balanced flavors, beautifully presented, and cooked to perfection. ...',
        },
        {
            customerName: 'Customer B',
            feedbackText: 'The [signature dish] was absolutely amazing! Perfectly balanced flavors, beautifully presented, and cooked to perfection. ...',
        },
        {
            customerName: 'Customer C',
            feedbackText: 'The [signature dish] was absolutely amazing! Perfectly balanced flavors, beautifully presented, and cooked to perfection. ...',
        },
    ]), feedbackList = _m[0], setFeedbackList = _m[1];
    var _o = (0, react_1.useState)(false), addressDropdown = _o[0], setAddressDropdown = _o[1];
    var addressDropdownRef = (0, react_1.useRef)(null);
    var _p = (0, react_1.useState)({
        houseNumber: '',
        landmark: '',
        pincode: '',
    }), addressFields = _p[0], setAddressFields = _p[1];
    var _q = (0, react_1.useState)(null), addressUpdatedMessage = _q[0], setAddressUpdatedMessage = _q[1];
    var handleDateChange = function (date) {
        if (date && date >= new Date()) {
            setSelectedDate(date);
        }
        else {
            alert('Please select a future date.');
        }
    };
    var handleEditSaveMenu = function () {
        if (isEditingMenu) {
            alert('Meal updated.');
        }
        setIsEditingMenu(!isEditingMenu);
    };
    var handleImageUpload = function (index, event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var newImages = __spreadArray([], foodImages, true);
                newImages[index] = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                setFoodImages(newImages);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    var handleFoodItemChange = function (index, event) {
        var newItems = __spreadArray([], foodItems, true);
        newItems[index] = event.target.value;
        setFoodItems(newItems);
    };
    var handleIncrement = function () {
        if (isChangingQuantity) {
            setQuantity(quantity + 1);
        }
    };
    var handleDecrement = function () {
        if (isChangingQuantity && quantity > 0) {
            setQuantity(quantity - 1);
        }
    };
    var handleSaveQuantity = function () {
        if (isChangingQuantity) {
            alert('Quantity updated.');
        }
        setIsChangingQuantity(!isChangingQuantity);
    };
    var handleUpdateStatus = function (status) {
        setMealStatus(status);
        setOrders(orders.map(function (order) { return (__assign(__assign({}, order), { mealStatus: status })); }));
    };
    var handleAddressChange = function (e) {
        var _a;
        setAddressFields(__assign(__assign({}, addressFields), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var handleUpdateAddress = function () {
        // Add your logic to update the address (e.g., API call) here
        console.log('Address updated:', addressFields);
        // Show success message
        setAddressUpdatedMessage('Address updated successfully');
        // Optionally, clear the message after a few seconds
        setTimeout(function () {
            setAddressUpdatedMessage(null);
        }, 3000);
    };
    var renderMiddlePanel = function () {
        switch (selectedFunction) {
            case 'Add Menu':
                return ((0, jsx_runtime_1.jsxs)("div", { className: "add-menu-panel", children: [(0, jsx_runtime_1.jsxs)("div", { className: "day-change-row", children: [(0, jsx_runtime_1.jsx)(react_datepicker_1.default, { selected: selectedDate, onChange: handleDateChange, minDate: new Date(), dateFormat: "dd/MM/yyyy", placeholderText: "Select Date" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleEditSaveMenu, children: isEditingMenu ? 'Save' : 'Change Menu' })] }), (0, jsx_runtime_1.jsx)("text", { children: "Enter the Price : " }), (0, jsx_runtime_1.jsx)("input", { className: 'input-section', type: "text", placeholder: "enter the price : eg 80", value: mealPrice, onChange: function (e) { return setMealPrice(Number(e.target.value)); } }), (0, jsx_runtime_1.jsx)("div", { className: "food-items-container", children: foodItems.map(function (item, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "food-item", children: [(0, jsx_runtime_1.jsx)("input", { type: "file", accept: "image/*", onChange: function (event) { return handleImageUpload(index, event); } }), foodImages[index] && (0, jsx_runtime_1.jsx)("img", { src: foodImages[index], alt: "Food ".concat(index) }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: item, onChange: function (event) { return handleFoodItemChange(index, event); } })] }, index)); }) })] }));
            case 'Update Quantity':
                return ((0, jsx_runtime_1.jsxs)("div", { className: "update-quantity-panel", children: [(0, jsx_runtime_1.jsxs)("div", { className: "day-change-row", children: [(0, jsx_runtime_1.jsx)(react_datepicker_1.default, { selected: selectedDate, onChange: handleDateChange, minDate: new Date(), dateFormat: "dd/MM/yyyy", placeholderText: "Select Date" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleSaveQuantity, children: isChangingQuantity ? 'Save' : 'Change Quantity' })] }), (0, jsx_runtime_1.jsx)("p", { className: "meals-text", children: "Meals can be prepared" }), (0, jsx_runtime_1.jsxs)("div", { className: "quantity-controls", children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleDecrement, className: "quantity-button", children: "-" }), (0, jsx_runtime_1.jsx)("span", { className: "quantity-value", children: quantity }), (0, jsx_runtime_1.jsx)("button", { onClick: handleIncrement, className: "quantity-button", children: "+" })] })] }));
            case 'Update Status':
                return ((0, jsx_runtime_1.jsxs)("div", { className: "update-status-panel", children: [(0, jsx_runtime_1.jsx)("h2", { children: "UPDATE THE MEAL STATUS" }), (0, jsx_runtime_1.jsx)("button", { className: "status-button ".concat(mealStatus === 'Preparing the Meal' ? 'active' : ''), onClick: function () { return handleUpdateStatus('Preparing the Meal'); }, children: "Preparing the Meal" }), (0, jsx_runtime_1.jsx)("button", { className: "status-button ".concat(mealStatus === 'Packing the Meal' ? 'active' : ''), onClick: function () { return handleUpdateStatus('Packing the Meal'); }, children: "Packing the Meal" }), (0, jsx_runtime_1.jsx)("button", { className: "status-button ".concat(mealStatus === 'Meal Out for Delivery' ? 'active' : ''), onClick: function () { return handleUpdateStatus('Meal Out for Delivery'); }, children: "Meal Out for Delivery" })] }));
            case 'View Feedback':
                return ((0, jsx_runtime_1.jsxs)("div", { className: "view-feedback-panel", children: [(0, jsx_runtime_1.jsx)("h2", { children: "VIEW FEEDBACK" }), feedbackList.map(function (feedback, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "feedback-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "feedback-icon", children: (0, jsx_runtime_1.jsx)("img", { src: "./images/icons/user.png" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "feedback-content", children: [(0, jsx_runtime_1.jsx)("p", { className: "customer-name", children: feedback.customerName }), (0, jsx_runtime_1.jsx)("p", { className: "feedback-text", children: feedback.feedbackText })] })] }, index)); })] }));
            case 'Change Address':
                return ((0, jsx_runtime_1.jsxs)("div", { className: "change-address-panel", children: [(0, jsx_runtime_1.jsx)("h2", { children: "ADDRESS" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "houseNumber", placeholder: "House number/Street name", value: addressFields.houseNumber, onChange: handleAddressChange }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "landmark", placeholder: "Landmark/City/state", value: addressFields.landmark, onChange: handleAddressChange }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "pincode", placeholder: "Pincode", value: addressFields.pincode, onChange: handleAddressChange }), (0, jsx_runtime_1.jsx)("button", { onClick: handleUpdateAddress, children: "UPDATE" }), addressUpdatedMessage && (0, jsx_runtime_1.jsx)("p", { className: "success-message", children: addressUpdatedMessage })] }));
            default:
                return (0, jsx_runtime_1.jsx)("div", { children: "Default Content" });
        }
    };
    var handleIncome = function () {
        navigate('/income');
        setHomeMakerDropdown(false);
    };
    var handleChangePassword = function () {
        navigate('/change-password');
        setHomeMakerDropdown(false);
    };
    var handleLogout = function () {
        navigate('/ '); // Navigate to the login page
        setHomeMakerDropdown(false);
    };
    var handleClickOutside = function (event) {
        if (homeMakerDropdownRef.current && event.target instanceof Node && !homeMakerDropdownRef.current.contains(event.target)) {
            setHomeMakerDropdown(false);
        }
    };
    var handleChangeAddress = function () {
        console.log('Change Address clicked');
        setSelectedFunction('Change Address');
        setAddressDropdown(false);
    };
    var handleClickOutsideAddress = function (event) {
        if (addressDropdownRef.current && event.target instanceof Node && !addressDropdownRef.current.contains(event.target)) {
            setAddressDropdown(false);
        }
    };
    react_1.default.useEffect(function () {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mousedown', handleClickOutsideAddress);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', handleClickOutsideAddress);
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "homemaker-homepage", children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: 'top-panel', children: [(0, jsx_runtime_1.jsxs)("div", { className: "home-maker-dropdown-container", ref: homeMakerDropdownRef, children: [(0, jsx_runtime_1.jsxs)("button", { className: "home-maker-button", onClick: function () { return setHomeMakerDropdown(!homeMakerDropdown); }, children: [(0, jsx_runtime_1.jsx)("img", { src: "./images/icons/user.png", alt: "Profile", className: "button-icon" }), "Home-maker"] }), homeMakerDropdown && ((0, jsx_runtime_1.jsxs)("div", { className: "home-maker-dropdown", children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleIncome, children: "Income" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleChangePassword, children: "Change Password" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleLogout, children: "Logout" })] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "address-dropdown-container", ref: addressDropdownRef, children: [(0, jsx_runtime_1.jsxs)("button", { className: "address-button", onClick: function () { return setAddressDropdown(!addressDropdown); }, children: [(0, jsx_runtime_1.jsx)("img", { src: "./images/icons/location.png", alt: "Location", className: "button-icon" }), "Address"] }), addressDropdown && ((0, jsx_runtime_1.jsx)("div", { className: "address-dropdown", children: (0, jsx_runtime_1.jsx)("button", { onClick: handleChangeAddress, children: "Change Address" }) }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "left-panel", children: [(0, jsx_runtime_1.jsx)("h2", { children: "ORDER RECEIVED" }), orders.map(function (order, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "order-item", children: [(0, jsx_runtime_1.jsxs)("p", { children: ["Customer: ", order.customerName] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Quantity: ", order.mealQuantity] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Location: ", order.location] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Payment: ", order.paymentStatus] }), order.mealStatus && (0, jsx_runtime_1.jsxs)("p", { children: ["Meal Status: ", order.mealStatus] })] }, index)); })] }), (0, jsx_runtime_1.jsx)("div", { className: "middle-panel", children: renderMiddlePanel() }), (0, jsx_runtime_1.jsxs)("div", { className: "right-panel", children: [(0, jsx_runtime_1.jsx)("button", { className: selectedFunction === 'Add Menu' ? 'active' : '', onClick: function () { return setSelectedFunction('Add Menu'); }, children: "ADD MENU" }), (0, jsx_runtime_1.jsx)("button", { className: selectedFunction === 'Update Quantity' ? 'active' : '', onClick: function () { return setSelectedFunction('Update Quantity'); }, children: "UPDATE QUANTITY" }), (0, jsx_runtime_1.jsx)("button", { className: selectedFunction === 'Update Status' ? 'active' : '', onClick: function () { return setSelectedFunction('Update Status'); }, children: "UPDATE STATUS" }), (0, jsx_runtime_1.jsx)("button", { className: selectedFunction === 'View Feedback' ? 'active' : '', onClick: function () { return setSelectedFunction('View Feedback'); }, children: "VIEW FEEDBACK" })] })] }));
};
exports.default = HomeMakerHomepage;
