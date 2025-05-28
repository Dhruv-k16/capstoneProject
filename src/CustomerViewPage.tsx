import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Edit, Trash2, User, Mail, Phone, MapPin, ChevronUp } from 'lucide-react';
import './CustomerView.css';

interface Customer {
    id: string;
    username: string;
    first_name: string;
    email: string;
    contact: string;
    addresses: {
        street?: string;
        city?: string;
        stateProvince?: string;
        zipCode?: string;
        phone?: string;
    }[];
    customer_type?: 'Subscriber' | 'Regular';
}

const CustomerViewPage = () => {
    const [customerType, setCustomerType] = useState<'All' | 'Subscriber' | 'Regular'>('All');
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8000/api/customer/');
                const data = await response.json();
                const formatted: Customer[] = data.map((cust: any) => ({
                  ...cust,
                  id: cust._id?.$oid || cust._id || Math.random().toString(36),
                  contact: cust.contact || '',
                  first_name: cust.first_name || '',
                  addresses: Array.isArray(cust.addresses) ? cust.addresses : [],
                  customer_type: cust.customer_type || 'Regular',
                }));
                
                const filtered = customerType === 'All'
                  ? formatted
                  : formatted.filter(c => c.customer_type === customerType);
                
                setCustomers(filtered);
            } catch (error) {
                console.error('Failed to fetch customers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, [customerType]);

    const toggleCustomerDetails = (id: string) => {
        setExpandedCustomerId(prev => (prev === id ? null : id));
    };

    const getCustomerExtraDetails = useCallback((id: string) => ({
        totalOrders: Math.floor(Math.random() * 50) + 1,
        mostOrderedFrom: ['Homemaker A', 'Homemaker B', 'Homemaker C'][Math.floor(Math.random() * 3)],
        averageOrdersPerWeek: (Math.random() * 5).toFixed(1),
    }), []);

    const handleRemoveCustomer = async (customerId: string, username: string) => {
      try {
        const res = await fetch(`http://localhost:8000/api/customer/delete/${username}/`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
          alert("✅ " + data.message);
          setCustomers(prev => prev.filter(c => c.id !== customerId));
        } else {
          alert("❌ " + data.message);
        }
      } catch (err) {
        console.error("❌ Failed to delete customer:", err);
        alert("❌ Something went wrong while deleting the customer.");
      }
    };
    

    return (
        <div className="customer-view-page">
            <div className="top-panel-view-cust">
                <div className="custom-select-wrapper">
                    <button
                        className="custom-select-button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {customerType}
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    {dropdownOpen && (
                        <div className="custom-select-content">
                            {['All', 'Subscriber', 'Regular'].map(type => (
                                <div key={type}
                                    className="custom-select-item"
                                    onClick={() => { setCustomerType(type as any); setDropdownOpen(false); }}
                                >
                                    {type}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <h1 className='cust'><u>CUSTOMERS</u></h1>
            </div>

            <div className="middle-panel-view-cust">
                {loading ? (
                    <div className="loading-message">Loading customers...</div>
                ) : customers.length === 0 ? (
                    <div className="no-customers-message">No customers found for the selected type.</div>
                ) : (
                    customers.map((cust) => (
                        <div key={cust.id} className="mb-4">
                            <div
                                className={`customer-card ${expandedCustomerId === cust.id ? 'expanded' : ''}`}
                                onClick={() => toggleCustomerDetails(cust.id)}
                            >
                                <div className="customer-header">
                                    <h3 className="customer-username">
                                        <User className="user-icon" />
                                        {cust.username}
                                    </h3>
                                    <div className="customer-actions">
                                        <button
                                          className="remove-button"
                                          onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            handleRemoveCustomer(cust.id, cust.username);
                                          }}
                                        >
                                          <Trash2 className="remove-icon" />
                                        </button>

                                    </div>
                                </div>
                                <div>
                                    <div className="customer-name">{cust.first_name}</div>
                                    <div className="customer-info">
                                        <Mail className="mail-icon" />
                                        {cust.email}
                                    </div>
                                    <div className="customer-info">
                                        <Phone className="phone-icon" />
                                        {cust.contact}
                                    </div>
                                    {cust.addresses.map((addr, idx) => (
                                        <div key={idx} className="customer-info">
                                            <MapPin className="map-pin-icon" />
                                            {`${addr.street || ''}, ${addr.city || ''}, ${addr.stateProvince || ''}, ${addr.zipCode || ''}`}
                                        </div>
                                    ))}
                                    {expandedCustomerId === cust.id && (
                                        <div className="customer-extra-details">
                                            <h4 className="extra-details-title">Extra Details:</h4>
                                            {(() => {
                                                const details = getCustomerExtraDetails(cust.id);
                                                return (
                                                    <>
                                                        <p>Total Orders: {details.totalOrders}</p>
                                                        <p>Most Ordered From: {details.mostOrderedFrom}</p>
                                                        <p>Average Orders/Week: {details.averageOrdersPerWeek}</p>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    )}
                                    <div className="expand-icon">
                                        {expandedCustomerId === cust.id ? (
                                            <ChevronUp className="expand-up-icon" />
                                        ) : (
                                            <ChevronDown className="expand-down-icon" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CustomerViewPage;
