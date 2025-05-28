import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminHomePage.css';
import Navbar from './navbar.tsx';
import { LogOut, Settings, UserPlus } from 'lucide-react';

interface UserCounts {
  customers: number;
  homeMakers: number;
  deliveryMen: number;
}

interface RevenueAndOrders {
  revenue: number;
  orders: number;
}

interface SurveyCounts {
  total: number;
  pending: number;
  approved: number;
}

interface AdminUser {
  name: string;
  user_id: string;
}

const AdminHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [userCounts, setUserCounts] = useState<UserCounts>({ customers: 0, homeMakers: 0, deliveryMen: 0 });
  const [revenueAndOrders, setRevenueAndOrders] = useState<RevenueAndOrders>({ revenue: 0, orders: 0 });
  const [surveyCounts, setSurveyCounts] = useState<SurveyCounts>({ total: 0, pending: 0, approved: 0 });
  const [adminUser, setAdminUser] = useState<AdminUser>({ name: 'Admin', user_id: 'ADMIN-001' });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    userId: '',
    email: '',
    contact: '',
    location: '',
    password: '',
  });
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState<'request' | 'verify' | 'reset'>('request');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch user counts
        const userCountsResponse = await fetch('http://127.0.0.1:8000/api/admin/user-counts/');
        if (!userCountsResponse.ok) {
          console.error('Error fetching user counts:', userCountsResponse.status, await userCountsResponse.text());
          setError('Failed to fetch user counts.');
        } else {
          const userCountsData = await userCountsResponse.json();
          console.log('User Counts Data:', userCountsData);
          setUserCounts(userCountsData);
        }

        // Fetch revenue and order counts
        const revenueAndOrdersResponse = await fetch('http://127.0.0.1:8000/api/admin/revenue-orders/');
        if (!revenueAndOrdersResponse.ok) {
          console.error('Error fetching revenue and order data:', revenueAndOrdersResponse.status, await revenueAndOrdersResponse.text());
          setError('Failed to fetch revenue and order data.');
        } else {
          const revenueAndOrdersData = await revenueAndOrdersResponse.json();
          console.log('Revenue and Orders Data:', revenueAndOrdersData);
          setRevenueAndOrders(revenueAndOrdersData);
        }

        // Fetch survey counts
        const surveyCountsResponse = await fetch('http://127.0.0.1:8000/api/admin/survey-counts/');
        if (!surveyCountsResponse.ok) {
          console.error('Error fetching survey counts:', surveyCountsResponse.status, await surveyCountsResponse.text());
          setError('Failed to fetch survey counts.');
        } else {
          const surveyCountsData = await surveyCountsResponse.json();
          console.log('Survey Counts Data:', surveyCountsData);
          setSurveyCounts(surveyCountsData);
        }

        // Fetch admin user data
        const adminUserResponse = await fetch('http://127.0.0.1:8000/api/admin/profile/');
        if (!adminUserResponse.ok) {
          console.error('Error fetching admin user data:', adminUserResponse.status, await adminUserResponse.text());
          setError('Failed to fetch admin user data.');
        } else {
          const adminUserData = await adminUserResponse.json();
          console.log('Admin User Data:', adminUserData);
          setAdminUser({ name: adminUserData.name, user_id: adminUserData.userId });
        }
      } catch (error: any) {
        console.error('An unexpected error occurred:', error);
        setError(error.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node
        )
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    const handleViewCustomers = () => {
        navigate('/CustomerViewPage');
    };

    const handleViewHomeMakers = () => {
        navigate('/HomemakerView');
    };

    const handleViewDeliveryMen = () => {
        navigate('/DeliverymanViewPage');
    };

  const navigateToViews = () => {
    navigate('/views');
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login');
  };

  const handlePasswordChange = async () => {
    const res = await fetch('http://localhost:8000/api/admin/change-password/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, old_password: oldPassword, new_password: newPassword }),
    });
  
    const data = await res.json();
    if (res.ok) alert("✅ Password updated!"+data.message);
    else alert(`❌ ${data.error}`+data.mess);
  };
  
  const handleForgotPassword = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/forgot-password/admin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("📧 OTP sent to email.");
        setStage('verify');
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
    }
  };
  
  const handleVerifyOtp = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/verify-otp/admin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("✅ OTP verified");
        setStage('reset');
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
    }
  };
  
  const handleSetNewPassword = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/admin/change-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          new_password: newPassword
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("🔐 Password successfully updated.");
        setShowChangePasswordForm(false);
        setStage('request');
        setEmail('');
        setOtp('');
        setOldPassword('');
        setNewPassword('');
      } else {
        alert(`❌ ${data.message || data.error}`);
      }
    } catch (err) {
      console.error("Error setting new password:", err);
    }
  };
  
  const handleChange = (field: string, value: string) => {
    setNewAdmin(prev => ({ ...prev, [field]: value }));
  };

  const submitNewAdmin = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admins/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdmin),
      });
  
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to add admin");
  
      alert("✅ Admin added successfully");
      setShowAddAdminForm(false);
      setNewAdmin({ name: '', userId: '', email: '', contact: '', location: '', password: '' });
    } catch (err: any) {
      alert("❌ " + err.message);
    }
  };


  

  return (
    <div className="admin-homepage">
      <Navbar />
      <div className="top-actions">
        <div className="admin-profile-button-container">
          <button className="admin-profile-button" onClick={handleProfileClick}>
            <img src="./images/icons/user.png" alt="Admin Profile" className="profile-icon" />
            {adminUser.user_id}
          </button>
          {isProfileOpen && (
            <div className="profile-dropdown" ref={profileDropdownRef}>
              <button onClick={()=>setShowAddAdminForm(true)}>
                <UserPlus className="mr-2" size={16} />
                Add New Admin
              </button>
              {showAddAdminForm && (
                <div className="add-admin-form">
                  <h2>Add New Admin</h2>
                  <input type="text" placeholder="Name" value={newAdmin.name} onChange={e => handleChange('name', e.target.value)} />
                  <input type="text" placeholder="User ID" value={newAdmin.userId} onChange={e => handleChange('userId', e.target.value)} />
                  <input type="email" placeholder="Email" value={newAdmin.email} onChange={e => handleChange('email', e.target.value)} />
                  <input type="text" placeholder="Contact" value={newAdmin.contact} onChange={e => handleChange('contact', e.target.value)} />
                  <input type="text" placeholder="Location" value={newAdmin.location} onChange={e => handleChange('location', e.target.value)} />
                  <input type="password" placeholder="Password" value={newAdmin.password} onChange={e => handleChange('password', e.target.value)} />
                  <button onClick={submitNewAdmin}>Submit</button>
                  <button onClick={() => setShowAddAdminForm(false)}>Cancel</button>
                </div>
              )}
              <button onClick={()=>setShowChangePasswordForm(true)}>
                <Settings className="mr-2" size={16} />
                Change Password
              </button>
              {showChangePasswordForm && (
                <div className="change-password-form">
                  {stage === 'request' && (
                    <>
                      <input
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                        type="password"
                        placeholder="Current Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button onClick={handlePasswordChange}>Change Password</button>
                      <button onClick={handleForgotPassword}>Forgot Password?</button>
                    </>
                  )}

                  {stage === 'verify' && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <button onClick={handleVerifyOtp}>Verify OTP</button>
                    </>
                  )}

                  {stage === 'reset' && (
                    <>
                      <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button onClick={handleSetNewPassword}>Set New Password</button>
                    </>
                  )}
                </div>
              )}
              <button onClick={handleLogout}>
                <LogOut className="mr-2" size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '20px' }} className='top-btns'>
          <button className="action-button" onClick={navigateToViews}>
            VIEW TRANSACTIONS
          </button>
          <button className="action-button" onClick={navigateToViews}>
            TRACK ORDERS
          </button>
        </div>
      </div>
      <div className="main-content">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className="left-panel">
              <div className="users-section">
                <div className="panel user-panel">
                  <div className="panel-header">USERS</div>
                  <div className="user-counts">
                    <div className="user-item">
                      <span className="user-label">CUSTOMERS</span>
                      <span className="user-value">{userCounts.customers}</span>
                      <button className="view-button" onClick={handleViewCustomers}>
                        VIEW
                      </button>
                    </div>
                    <div className="user-item">
                      <span className="user-label">HOME-MAKERS</span>
                      <span className="user-value">{userCounts.homeMakers}</span>
                      <button className="view-button" onClick={handleViewHomeMakers}>
                        VIEW
                      </button>
                    </div>
                    <div className="user-item">
                      <span className="user-label">DELIVERY MAN</span>
                      <span className="user-value">{userCounts.deliveryMen}</span>
                      <button className="view-button" onClick={handleViewDeliveryMen}>
                        VIEW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="middle-panel">
              <div className="revenue-orders-section">
                <div className="panel small-panel">
                  <div className="panel-header">REVENUE</div>
                  <div className="panel-body">
                    <span className="metric">Rs. {revenueAndOrders.revenue}</span>
                    <button className="view-button view-button-center" onClick={navigateToViews}>
                      VIEW
                    </button>
                  </div>
                </div>

                <div className="panel small-panel">
                  <div className="panel-header">ORDERS</div>
                  <div className="panel-body">
                    <span className="metric">{revenueAndOrders.orders}</span>
                    <button className="view-button view-button-center" onClick={navigateToViews}>
                      VIEW
                    </button>
                  </div>
                </div>
              </div>

              <div className="surveys-section">
                <div className="panel large-panel">
                  <div className="panel-header">SURVEYS</div>
                  <div className="survey-counts">
                    <div className="count-item">
                      <span className="count-label">TOTAL</span>
                      <span className="count-value">{surveyCounts.total}</span>
                    </div>
                    <div className="count-item">
                      <span className="count-label">PENDING</span>
                      <span className="count-value">{surveyCounts.pending}</span>
                    </div>
                    <div className="count-item">
                      <span className="count-label">APPROVED</span>
                      <span className="count-value">{surveyCounts.approved}</span>
                    </div>
                  </div>
                  <Link to="/SurveyPage">
                    <button className="view-button view-button-bottom">
                      VIEW
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;
