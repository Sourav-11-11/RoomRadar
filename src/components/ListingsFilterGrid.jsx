import React, { useState, useEffect } from 'react';

const ListingsFilterGrid = ({ initialListings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [roomTypeFilter, setRoomTypeFilter] = useState('all');
  const [isTyping, setIsTyping] = useState(false);

  // Briefly fade grid opacity while users adjust filters
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 250);
    return () => clearTimeout(timer);
  }, [searchTerm, budgetFilter, roomTypeFilter]);

  let filteredListings = initialListings;

  if (searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    filteredListings = filteredListings.filter(listing =>
      listing.title.toLowerCase().includes(lowerSearch) ||
      listing.location.toLowerCase().includes(lowerSearch)
    );
  }

  if (budgetFilter === 'low') {
    filteredListings = filteredListings.filter(listing => listing.price < 8000);
  } else if (budgetFilter === 'mid') {
    filteredListings = filteredListings.filter(listing => listing.price >= 8000 && listing.price <= 15000);
  } else if (budgetFilter === 'high') {
    filteredListings = filteredListings.filter(listing => listing.price > 15000);
  }

  if (roomTypeFilter !== 'all') {
    filteredListings = filteredListings.filter(listing => listing.roomType === roomTypeFilter);
  }

  const clearFilters = () => {
    setSearchTerm('');
    setBudgetFilter('all');
    setRoomTypeFilter('all');
  };

  return (
    <div className="container mt-4 mb-5">
      <div 
        className="d-flex flex-wrap align-items-center gap-3 mb-5 p-3 bg-white" 
        style={{ 
          borderRadius: '100px', 
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
          border: '1px solid #f1f5f9'
        }}
      >
        <div className="flex-grow-1 position-relative px-2" style={{ minWidth: '220px' }}>
          <i className="fa-solid fa-magnifying-glass position-absolute" style={{ top: '50%', left: '20px', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
          <input
            type="text"
            className="form-control border-0 shadow-none"
            placeholder="Search by city, area, or PG name..."
            style={{ paddingLeft: '35px', backgroundColor: 'transparent', fontWeight: '500' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="d-flex gap-2 pe-1">
          <select
            className="form-select border-0 shadow-none cursor-pointer"
            style={{ backgroundColor: '#f8fafc', borderRadius: '100px', fontWeight: '500', color: '#475569', minWidth: '140px' }}
            value={budgetFilter}
            onChange={(e) => setBudgetFilter(e.target.value)}
          >
            <option value="all">Any Budget</option>
            <option value="low">Under &#8377;8K/mo</option>
            <option value="mid">&#8377;8K - &#8377;15K/mo</option>
            <option value="high">Above &#8377;15K/mo</option>
          </select>

          <select
            className="form-select border-0 shadow-none cursor-pointer"
            style={{ backgroundColor: '#f8fafc', borderRadius: '100px', fontWeight: '500', color: '#475569', minWidth: '140px' }}
            value={roomTypeFilter}
            onChange={(e) => setRoomTypeFilter(e.target.value)}
          >
            <option value="all">Room Type</option>
            <option value="single">Single Room</option>
            <option value="double">Double Sharing</option>
            <option value="triple">Triple Sharing</option>
          </select>

          <div className="d-flex align-items-center ms-2 ps-3 border-start">
            <span className="badge rounded-pill d-flex align-items-center justify-content-center fw-bold" 
                  style={{ height: '36px', padding: '0 16px', backgroundColor: '#0f172a', color: 'white', fontSize: '0.90rem' }}>
              {filteredListings.length}
            </span>
          </div>
        </div>
      </div>

      <div style={{ transition: 'opacity 0.2s', opacity: isTyping ? 0.4 : 1 }}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          
          {filteredListings.length === 0 ? (
            <div className="col-12 py-5 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '40vh' }}>
              <div 
                className="d-flex align-items-center justify-content-center rounded-circle mb-4 shadow-sm" 
                style={{ width: '90px', height: '90px', backgroundColor: '#f8fafc' }}
              >
                <i className="fa-solid fa-house-chimney-crack text-muted fs-1"></i>
              </div>
              <h4 className="fw-bold mb-2">No rooms available</h4>
              <p className="text-muted mb-4" style={{ maxWidth: '400px' }}>Try adjusting your search criteria, dropping your budget constraint, or exploring other room types.</p>
              <button 
                onClick={clearFilters}
                className="btn btn-dark rounded-pill px-4 py-2 shadow-sm"
                style={{ fontWeight: 500 }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredListings.map(listing => (
              <div className="col" key={listing._id}>
                <a href={`/listings/${listing._id}`} className="text-decoration-none d-block h-100">
                  <div 
                    className="card h-100 border-0 bg-white" 
                    style={{ 
                      borderRadius: '20px', 
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)';
                    }}
                  >
                    
                    <div className="position-relative overflow-hidden m-2" style={{ height: '240px', borderRadius: '16px' }}>
                      <img 
                        src={listing.image?.url} 
                        alt={listing.title} 
                        className="w-100 h-100 object-fit-cover listing-card-img" 
                        style={{ transition: 'transform 0.5s ease' }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                      
                      <div 
                        className="position-absolute top-0 end-0 m-3 px-2 py-1 rounded-pill fw-bold shadow-sm d-flex align-items-center gap-1"
                        style={{ 
                          backgroundColor: 'rgba(255,255,255,0.85)', 
                          backdropFilter: 'blur(8px)',
                          fontSize: '0.80rem',
                          color: '#0f172a'
                        }}
                      >
                        <i className="fa-solid fa-bolt" style={{ color: '#f59e0b' }}></i> 
                        {listing.realityScore > 0 ? Math.round(listing.realityScore * 20) : "NR"}
                      </div>
                    </div>

                    <div className="card-body p-4 pt-3 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title fw-bold text-truncate text-dark mb-0 pe-2" style={{ fontSize: '1.2rem' }}>
                          {listing.title}
                        </h5>
                      </div>
                      
                      <p className="card-text text-muted small mb-3">
                        <i className="fa-solid fa-location-dot me-1"></i> {listing.location}
                      </p>

                      <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-muted small d-block" style={{ fontSize: '0.75rem' }}>Base Rent</span>
                          <span className="fw-semibold text-dark">&#8377; {listing.price?.toLocaleString('en-IN')}</span>
                        </div>
                        
                        <div className="text-end">
                          <span className="fw-bold d-block text-uppercase" style={{ fontSize: '0.70rem', color: '#f59e0b', letterSpacing: '0.5px' }}>True Cost</span>
                          <span className="fw-bold text-dark" style={{ fontSize: '1.15rem' }}>
                            &#8377; {(listing.trueMonthlyCost || listing.price).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </a>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default ListingsFilterGrid;