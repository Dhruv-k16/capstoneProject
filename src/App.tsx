import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import Login from './login.tsx';
import AddKitchen from './AddKitchen.tsx';
import Help from './Help.tsx';
import AboutUs from './AboutUs.tsx';
import Signup from './Signup.tsx';
import CustomerHome from './CustomerHome.tsx';
import Payment from './Payment.tsx';
import UpdateDetails from './UpdateDetails.tsx';
import ChangePassword from './ChangePassword.tsx';
import UserProfile from './UserProfile.tsx';
import Navbar from './navbar.tsx';
import Orders from './Orders.tsx';
import TrackOrder from './TrackOrder.tsx';
import HomeMakerHomepage from './HomeMakerHomepage.tsx';
import DeliveryManHomePage from './DeliveryManHomePage.tsx';
import UploadPage from './UploadPage.tsx'; // Import the UploadPage component
import AdminHomePage from './AdminHomePage.tsx'; // Import the AdminHomePage component
import CustomerViewPage from './CustomerViewPage.tsx'; // Import CustomerViewPage
import HomeMakerViewPage from './HomemakerView.tsx'; // Import HomeMakerViewPage
import DeliveryManViewPage from './DeliverymanViewPage.tsx'; // Import DeliveryManViewPage
import SurveyPage from './SurveyPage.tsx'; // Import SurveyPage

function App() {
const [userRole, setUserRole] = useState<string | null>(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [customerName, setCustomerName] = useState<string | null>(null);
const [deliveryManName, setDeliveryManName] = useState<string | null>(null);
const navigate = useNavigate();

const roleToPath: Record<string, string> = {
    'homemaker': '/HomeMakerHomePage',
    'deliveryman': '/DeliveryManHomePage',
    'customer': '/customer-home/*',
    'admin': '/admin'
};

const handleLoginSuccess = (role: string, name?: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    if (role === 'customer' && name) {
        setCustomerName(name);
    }
    if (role === 'deliveryman' && name) {
        setDeliveryManName(name);
    }

    console.log('App.tsx - Role Received:', role); // Debugging

    navigate(roleToPath[role] || '/'); // Use the mapping, default to '/'
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
};

return (
    <>
        <Navbar userRole={userRole} isLoggedIn={isLoggedIn} />
        <Routes>
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add-kitchen" element={<AddKitchen />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/CustomerHome/*" element={<PrivateRoute><CustomerHome customerName={customerName} /></PrivateRoute>} />
            <Route path="/HomeMakerHomePage" element={<PrivateRoute><HomeMakerHomepage /></PrivateRoute>} />
            <Route path="/DeliveryManHomePage" element={<PrivateRoute><DeliveryManHomePage deliveryManName={deliveryManName} /></PrivateRoute>} />
            <Route path="/DeliveryProfile" element={<UserProfile userRole="deliveryman" isLoggedIn={true} />}/>    
            <Route path="/payment" element={<PrivateRoute><PaymentWithLocation userRole={userRole} isLoggedIn={isLoggedIn} /></PrivateRoute>} />
            <Route path="/update-details" element={<PrivateRoute><UpdateDetails userRole={userRole} isLoggedIn={isLoggedIn} /></PrivateRoute>} />
            <Route path="/change-password" element={<PrivateRoute><ChangePassword userRole={userRole} isLoggedIn={isLoggedIn} /></PrivateRoute>} />
            <Route path="/UserProfile" element={<PrivateRoute><UserProfile userRole={userRole} isLoggedIn={isLoggedIn} /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
            <Route path="/track-order/:orderId" element={<PrivateRoute><TrackOrderWithParams /></PrivateRoute>} />
            <Route path="/upload" element={<PrivateRoute><UploadPage /></PrivateRoute>} /> {/* Add this line */}
            <Route path="/AdminHomePage" element={<PrivateRoute><AdminHomePage /></PrivateRoute>} /> {/* Add this line */}
            <Route path="/SurveyPage" element={<PrivateRoute><SurveyPage /></PrivateRoute>} /> {/* Add this line for SurveyPage */}
            <Route path="/CustomerViewPage" element={<PrivateRoute><CustomerViewPage /></PrivateRoute>} />
            <Route path="/HomemakerView" element={<PrivateRoute><HomeMakerViewPage /></PrivateRoute>} />
            <Route path="/DeliverymanViewPage" element={<PrivateRoute><DeliveryManViewPage /></PrivateRoute>} />
        </Routes>
    </>
);
}

function TrackOrderWithParams() {
const { orderId } = useParams<{ orderId: string }>();
return <TrackOrder orderId={orderId ? parseInt(orderId, 10) : 0} />;
}

function PaymentWithLocation({ userRole, isLoggedIn }: { userRole: string | null; isLoggedIn: boolean }) {
const location = useLocation();
const totalPrice = location.state?.totalPrice || 0;
return <Payment totalPrice={totalPrice} userRole={userRole} isLoggedIn={isLoggedIn} />;
}

export default App;
