import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronDown, Edit, Trash2, User, Mail, Phone, MapPin, ChevronUp, Save, X
} from 'lucide-react';
import './HomemakerView.css';

interface Homemaker {
  _id: string;
  home_maker_name: string;
  gender: string;
  email: string;
  contact_no: string;
  address: string;
  landmark_city_state: string;
  pincode: string;
  no_of_meals_per_day: number;
}

const HomemakerViewPage = () => {
  const [homemakerType, setHomemakerType] = useState<'All' | 'Male' | 'Female'>('All');
  const [homemakers, setHomemakers] = useState<Homemaker[]>([]);
  const [expandedHomemakerId, setExpandedHomemakerId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Homemaker>>({});
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchHomemakers = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/api/homemaker/');
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Expected array response");

      const normalized = data.map((h: any)=>({
        ...h,
        _id:h._id || h.id || h.email,
      }))

      let filtered =normalized;
      if(homemakerType !== 'All'){
        filtered = normalized.filter((h: Homemaker)=> h.gender === homemakerType);
      }
      setHomemakers(filtered);
    } catch (err) {
      console.error("Failed to fetch homemakers", err);
      setHomemakers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomemakers();
  }, [homemakerType]);

  const toggleHomemakerDetails = (homemakerId: string) => {
    setExpandedHomemakerId(prev => prev === homemakerId ? null : homemakerId);
    setEditingId(null);
  };

  const handleEditHomemaker = (homemaker: Homemaker) => {
    if(!homemaker._id){
        console.error("Missing _id for homemaker" , homemaker);
        return;
    }
    setEditingId(homemaker._id);
    setEditData(homemaker);
  };

  const handleEditChange = (field: keyof Homemaker, value: string | number) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      const response = await fetch(`http://localhost:8000/api/homemaker/${editingId}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (!response.ok) throw new Error('Update failed');
      await fetchHomemakers();
      setEditingId(null);
      setEditData({});
    } catch (error) {
      console.error('Failed to update homemaker:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleRemoveHomemaker = async (homemakerId: string) => {
    if(!homemakerId){
        console.error("Cannot delete homemaker with missing _id");
        return;
    }

    try{
        const response = await fetch(`http://localhost:8000/api/homemaker/${homemakerId}/`,{
            method: 'DELETE'
        });
        if(!response.ok) throw new Error("Failed to delete homemaker");
        setHomemakers((prev)=> prev.filter((h)=> h._id !== homemakerId));
    }catch(error){
        console.error("Failed to delete homemaker:", error);
    }
};

  const getHomemakerExtraDetails = useCallback((homemakerId: string) => ({
    totalMealsPrepared: Math.floor(Math.random() * 200) + 50,
    averageOrdersPerWeek: (Math.random() * 10 + 5).toFixed(1),
    averageIncomePerWeek: (Math.random() * 5000 + 2000).toFixed(2),
  }), []);

  return (
    <div className="homemaker-view-page">
      <div className="top-panel-view-homemaker">
        <div className="homemaker-select-wrapper">
          <button className="homemaker-select-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {homemakerType} <ChevronDown />
          </button>
          {dropdownOpen && (
            <div className="homemaker-select-content" onClick={(e)=> e.stopPropagation()}>
              {['All', 'Male', 'Female'].map(type => (
                <div
                  key={type}
                  className="homemaker-select-item"
                  onClick={() => {
                    setHomemakerType(type as 'All' | 'Male' | 'Female');
                    setDropdownOpen(false);
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>
        <h1 className="homemaker"><u>HOMEMAKERS</u></h1>
      </div>

      <div className="middle-panel-view-homemaker">
        {loading ? (
          <div className="loading-message">Loading homemakers...</div>
        ) : homemakers.length === 0 ? (
          <div className="no-homemakers-message">No homemakers found.</div>
        ) : (
          homemakers.map(homemaker => {
            const isEditing = editingId === homemaker._id;
            const isExpanded = expandedHomemakerId === homemaker._id;

            return (
              <div key={homemaker._id || homemaker.email } className="mb-4">
                <div
                  className={`homemaker-card ${isExpanded ? 'expanded' : ''}`}
                  onClick={(e) =>{
                    e.stopPropagation();
                    toggleHomemakerDetails(homemaker._id);
                  } }
                >
                  <div className="homemaker-header">
                    <h3 className="homemaker-name-header"><User /> {homemaker.home_maker_name}</h3>
                    <div className="homemaker-actions">
                      {isEditing ? (
                        <>
                          <button onClick={handleSaveEdit}><Save /></button>
                          <button onClick={handleCancelEdit}><X /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={(e) => { e.stopPropagation();if(homemaker._id){ handleRemoveHomemaker(homemaker._id); } else{ console.error("Missing ID for Homemaker : ", homemaker)} }}>
                            <Trash2 />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="homemaker-info-edit">
                      <input value={editData.home_maker_name || ''} onChange={(e) => handleEditChange('home_maker_name', e.target.value)} />
                      <input value={editData.email || ''} onChange={(e) => handleEditChange('email', e.target.value)} />
                      <input value={editData.contact_no || ''} onChange={(e) => handleEditChange('contact_no', e.target.value)} />
                      <input value={editData.address || ''} onChange={(e) => handleEditChange('address', e.target.value)} />
                      <input value={editData.gender || ''} onChange={(e) => handleEditChange('gender', e.target.value)} />
                    </div>
                  ) : (
                    <>
                      <div className="homemaker-info"><Mail /> {homemaker.email}</div>
                      <div className="homemaker-info"><Phone /> {homemaker.contact_no}</div>
                      <div className="homemaker-info"><MapPin /> {homemaker.address}</div>
                      <div className="homemaker-info">Gender: {homemaker.gender}</div>
                    </>
                  )}

                  {isExpanded && (
                    <div className="homemaker-extra-details">
                      <h4>Extra Details:</h4>
                      {(() => {
                        const details = getHomemakerExtraDetails(homemaker._id);
                        return (
                          <>
                            <p>Total Meals Prepared: {details.totalMealsPrepared}</p>
                            <p>Average Orders/Week: {details.averageOrdersPerWeek}</p>
                            <p>Average Income/Week: ₹{details.averageIncomePerWeek}</p>
                          </>
                        );
                      })()}
                    </div>
                  )}
                  <div className="expand-icon">
                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default HomemakerViewPage;
