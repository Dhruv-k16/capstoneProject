"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var login_1 = __importDefault(require("./login"));
var AddKitchen_1 = __importDefault(require("./AddKitchen"));
var Help_1 = __importDefault(require("./Help"));
var AboutUs_1 = __importDefault(require("./AboutUs"));
var Signup_1 = __importDefault(require("./Signup"));
var CustomerHome_1 = __importDefault(require("./CustomerHome"));
var Payment_1 = __importDefault(require("./Payment"));
var UpdateDetails_1 = __importDefault(require("./UpdateDetails"));
var ChangePassword_1 = __importDefault(require("./ChangePassword"));
var UserProfile_1 = __importDefault(require("./UserProfile"));
var navbar_1 = __importDefault(require("./navbar"));
var Orders_1 = __importDefault(require("./Orders"));
var TrackOrder_1 = __importDefault(require("./TrackOrder"));
var HomeMakerHomepage_1 = __importDefault(require("./HomeMakerHomepage"));
var DeliveryManHomePage_1 = __importDefault(require("./DeliveryManHomePage"));
function App() {
    var _a = (0, react_1.useState)(null), userRole = _a[0], setUserRole = _a[1];
    var _b = (0, react_1.useState)(false), isLoggedIn = _b[0], setIsLoggedIn = _b[1];
    var _c = (0, react_1.useState)(null), customerName = _c[0], setCustomerName = _c[1];
    var _d = (0, react_1.useState)(null), deliveryManName = _d[0], setDeliveryManName = _d[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleLoginSuccess = function (role, name) {
        setIsLoggedIn(true);
        setUserRole(role);
        if (role === 'customer' && name) {
            setCustomerName(name);
        }
        if (role === 'deliveryman' && name) {
            setDeliveryManName(name);
        }
        navigate(role === 'homemaker' ? '/HomeMakerHomePage' :
            role === 'deliveryman' ? '/delivery-man-homepage' : '/customer-home');
    };
    var PrivateRoute = function (_a) {
        var children = _a.children;
        return isLoggedIn ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }) : (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/" });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(navbar_1.default, { userRole: userRole, isLoggedIn: isLoggedIn }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(login_1.default, { onLoginSuccess: handleLoginSuccess }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/signup", element: (0, jsx_runtime_1.jsx)(Signup_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/add-kitchen", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(AddKitchen_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/help", element: (0, jsx_runtime_1.jsx)(Help_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/about-us", element: (0, jsx_runtime_1.jsx)(AboutUs_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/customer-home", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(CustomerHome_1.default, { customerName: customerName }) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/HomeMakerHomePage", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(HomeMakerHomepage_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/delivery-man-homepage", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(DeliveryManHomePage_1.default, { deliveryManName: deliveryManName || 'Delivery Man' }) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/payment", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(PaymentWithLocation, { userRole: userRole, isLoggedIn: isLoggedIn }) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/update-details", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(UpdateDetails_1.default, { userRole: userRole, isLoggedIn: isLoggedIn }) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/change-password", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(ChangePassword_1.default, { userRole: userRole, isLoggedIn: isLoggedIn }) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/user-profile/*", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(UserProfile_1.default, { userRole: userRole, isLoggedIn: isLoggedIn }) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/orders", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(Orders_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/track-order/:orderId", element: (0, jsx_runtime_1.jsx)(PrivateRoute, { children: (0, jsx_runtime_1.jsx)(TrackOrderWithParams, {}) }) })] })] }));
}
function TrackOrderWithParams() {
    var orderId = (0, react_router_dom_1.useParams)().orderId;
    return (0, jsx_runtime_1.jsx)(TrackOrder_1.default, { orderId: orderId ? parseInt(orderId, 10) : 0 });
}
function PaymentWithLocation(_a) {
    var _b;
    var userRole = _a.userRole, isLoggedIn = _a.isLoggedIn;
    var location = (0, react_router_dom_1.useLocation)();
    var totalPrice = ((_b = location.state) === null || _b === void 0 ? void 0 : _b.totalPrice) || 0;
    return (0, jsx_runtime_1.jsx)(Payment_1.default, { totalPrice: totalPrice, userRole: userRole, isLoggedIn: isLoggedIn });
}
exports.default = App;
