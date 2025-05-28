import React, { useState, useEffect } from 'react';
import './Orders.css';
import Navbar from './navbar.tsx';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: number;
  homeMaker: string;
  meals: string;
  others: number;
  total: number;
  date: Date;
  status: 'delivered' | 'preparing' | 'delivery' | 'completed';
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with your actual data fetching logic
    const fetchedOrders: Order[] = [
      {
        id: 1,
        homeMaker: 'HOMEMAKER:',
        meals: 'Meal: panner, jeera rice, Ghee roti, daal fry',
        others: 10,
        total: 110,
        date: new Date('2025-10-12T10:00:00'),
        status: 'delivery',
      },
      {
        id: 2,
        homeMaker: 'HOMEMAKER:',
        meals: 'Meal: panner, jeera rice, Ghee roti, daal fry',
        others: 10,
        total: 110,
        date: new Date('2025-10-11T12:00:00'),
        status: 'preparing',
      },
      {
        id: 3,
        homeMaker: 'HOMEMAKER:',
        meals: 'Meal: panner, jeera rice, Ghee roti, daal fry',
        others: 10,
        total: 110,
        date: new Date('2025-10-10T14:00:00'),
        status: 'completed',
      },
      {
        id: 4,
        homeMaker: 'HOMEMAKER:',
        meals: 'Meal: panner, jeera rice, Ghee roti, daal fry',
        others: 10,
        total: 110,
        date: new Date('2025-10-09T16:00:00'),
        status: 'delivered',
      },
    ];

    const sortedOrders = fetchedOrders.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    setOrders(sortedOrders);
  }, []);

  const handleTrackOrder = (orderId: number) => {
    navigate(`/track-order/${orderId}`);
  };

  return (
    <div className="orders-page">
      <Navbar />
      <div className="orders-container">
        <h1>YOUR ORDERS</h1>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-item">
              <div className="order-details">
                <p>{order.homeMaker}</p>
                <p>{order.meals}</p>
                <p>Others: Rs. {order.others}</p>
                <p>Total: Rs. {order.total}</p>
              </div>
              <div className="order-date">
                {order.date.toLocaleDateString()}
              </div>
              {order.id === orders[0].id &&
                (order.status === 'preparing' || order.status === 'delivery') && (
                  <button
                    className="track-button"
                    onClick={() => handleTrackOrder(order.id)}
                  >
                    Track Order
                  </button>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;