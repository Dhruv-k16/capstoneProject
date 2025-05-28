import React, { useState, useEffect, useCallback } from 'react';
import { Edit, Trash2, User, Mail, Phone, MapPin, ChevronUp, ChevronDown } from 'lucide-react';
import './DeliverymanViewPage.css';

interface Deliveryman {
  id: string; // Not _id, because the serializer maps _id to id
  username: string;
  email: string;
  first_name: string;
  contact: string;
  addresses?: { street?: string }[];
}


const DeliverymanViewPage = () => {
  const [deliverymen, setDeliverymen] = useState<Deliveryman[]>([]);
  const [expandedDeliverymanId, setExpandedDeliverymanId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliverymen = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/deliverymen/');
        const data = await res.json();
        setDeliverymen(data);
      } catch (err) {
        console.error("Error fetching deliverymen:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliverymen();
  }, []);

  const toggleDeliverymanDetails = (id: string) => {
    setExpandedDeliverymanId(prev => (prev === id ? null : id));
  };

  const handleRemoveDeliveryman = async (mongoId: string, username: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/deliverymen/delete/${username}/`, {
        method: 'DELETE',
      });
      const data = await res.json();
  
      if (res.ok) {
        alert("✅ " + data.message);
        setDeliverymen(prev => prev.filter(d => d.id !== mongoId));
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("❌ Failed to delete deliveryman:", err);
      alert("❌ Something went wrong while deleting the deliveryman.");
    }
  };
  
  
  

  const getDeliverymanExtraDetails = useCallback(() => {
    return {
      totalOrdersDelivered: Math.floor(Math.random() * 100),
      deliveriesOnTime: Math.floor(Math.random() * 80),
      deliveriesDelayed: Math.floor(Math.random() * 20),
      averageDeliveriesPerWeek: (Math.random() * 5 + 2).toFixed(1),
    };
  }, []);

  return (
    <div className="deliveryman-view-page">
      <h1 className='delivery-man'><u>DELIVERYMEN</u></h1>
      <div className="middle-panel-view-deliveryman">
        {loading ? (
          <div className="loading-message">Loading deliverymen...</div>
        ) : deliverymen.length === 0 ? (
          <div className="no-deliverymen-message">No deliverymen found.</div>
        ) : (
          deliverymen.map((dman) => (
            <div key={dman.id} className="mb-4">
              <div
                className={expandedDeliverymanId === dman.id ? "deliveryman-card expanded" : "deliveryman-card"}
                onClick={() => toggleDeliverymanDetails(dman.id)}
              >
                <div className="deliveryman-header">
                  <h3 className="deliveryman-name-header">
                    <User className="user-icon" />
                    {dman.first_name}
                  </h3>
                  <div className="deliveryman-actions">
                    <button
                      className="edit-button"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        console.log("Editing deliveryman:", dman.id);
                      }}
                    >
                      <Edit className="edit-icon" />
                    </button>
                    <button
                      className="remove-button"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleRemoveDeliveryman(dman.id, dman.username);
                      }}
                    >
                      <Trash2 className="remove-icon" />
                    </button>

                  </div>
                </div>
                <div>
                  <div className="deliveryman-info">
                    <Mail className="mail-icon" /> {dman.email}
                  </div>
                  <div className="deliveryman-info">
                    <Phone className="phone-icon" /> {dman.contact}
                  </div>
                  <div className="deliveryman-info">
                    <MapPin className="map-pin-icon" />
                    {dman.addresses?.[0]?.street || 'No address'}
                  </div>

                  {expandedDeliverymanId === dman.id && (
                    <div className="deliveryman-extra-details">
                      <h4 className="extra-details-title">Extra Details:</h4>
                      {(() => {
                        const details = getDeliverymanExtraDetails();
                        return (
                          <>
                            <p>Total Orders Delivered: {details.totalOrdersDelivered}</p>
                            <p>Deliveries On Time: {details.deliveriesOnTime}</p>
                            <p>Deliveries Delayed: {details.deliveriesDelayed}</p>
                            <p>Average Deliveries/Week: {details.averageDeliveriesPerWeek}</p>
                          </>
                        );
                      })()}
                    </div>
                  )}
                  <div className="expand-icon">
                    {expandedDeliverymanId === dman.id ? <ChevronUp /> : <ChevronDown />}
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

export default DeliverymanViewPage;
