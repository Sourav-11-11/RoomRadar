import React, { useState } from 'react';

export default function TrueCostCalculator({ listing }) {
  const [includeFood, setIncludeFood] = useState(false);
  const [includeAC, setIncludeAC] = useState(false);

  const rent = listing.price || 0;
  const electricity = listing.electricityCost || 0;
  const maintenance = listing.maintenanceCost || 0;
  const foodCost = includeFood && !listing.foodIncluded ? 3000 : 0;
  const acCost = includeAC ? 1500 : 0;

  const total = rent + electricity + maintenance + foodCost + acCost;

  return (
    <div className="border border-0 bg-white h-100" style={{ borderRadius: '24px', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)' }}>
      <div className="p-4 border-bottom" style={{ borderColor: '#f1f5f9' }}>
        <h6 className="mb-0 fw-bold d-flex align-items-center text-dark" style={{ fontSize: '1.2rem' }}>
          <div className="d-flex align-items-center justify-content-center bg-light rounded-circle me-3 shadow-sm" style={{ width: '48px', height: '48px', color: '#10b981' }}>
            <i className="fa-solid fa-calculator fs-5"></i>
          </div>
          True Cost Calculator
        </h6>
      </div>

      <div className="p-4" style={{ backgroundColor: '#fafaf9', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' }}>
        <ul className="list-unstyled mb-4">
          <li className="d-flex justify-content-between align-items-center py-2 mb-2" style={{ borderBottom: '1px dashed #e2e8f0' }}>
            <span className="text-secondary fw-medium fs-6">Base Rent</span>
            <span className="fw-bold text-dark fs-6">&#8377; {rent.toLocaleString('en-IN')}</span>
          </li>
          <li className="d-flex justify-content-between align-items-center py-2 mb-2" style={{ borderBottom: '1px dashed #e2e8f0' }}>
            <span className="text-secondary fw-medium fs-6">Electricity Est.</span>
            <span className="fw-bold text-dark fs-6">&#8377; {electricity.toLocaleString('en-IN')}</span>
          </li>
          <li className="d-flex justify-content-between align-items-center py-2 mb-2" style={{ borderBottom: '1px dashed #e2e8f0' }}>
            <span className="text-secondary fw-medium fs-6">Maintenance</span>
            <span className="fw-bold text-dark fs-6">&#8377; {maintenance.toLocaleString('en-IN')}</span>
          </li>

          {listing.foodIncluded ? (
            <li className="d-flex justify-content-between align-items-center py-3 mb-2 rounded-3 px-3 shadow-sm mt-3" style={{ backgroundColor: '#ecfdf5', border: '1px solid #d1fae5' }}>
              <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-utensils text-success"></i>
                <span className="fw-bold text-success">Food Included</span>
              </div>
              <span className="fw-bold text-success">&#8377; 0</span>
            </li>
          ) : (
            <li className="d-flex justify-content-between align-items-center py-2 mt-3 cursor-pointer px-1">
              <label className="d-flex align-items-center gap-3 m-0 cursor-pointer w-100 p-2 rounded-3" style={{ transition: 'background-color 0.2s', backgroundColor: includeFood ? '#fff7ed' : 'transparent' }}>
                <div className="form-check m-0">
                  <input
                    type="checkbox"
                    className="form-check-input mt-0 shadow-sm cursor-pointer border-secondary"
                    style={{ width: '1.3em', height: '1.3em' }}
                    checked={includeFood}
                    onChange={(e) => setIncludeFood(e.target.checked)}
                  />
                </div>
                <span className="text-secondary fw-medium user-select-none d-flex flex-column">
                  <span className="text-dark">Add Mess Food</span>
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>Est. &#8377;3,000/mo</small>
                </span>
                <span className="fw-bold ms-auto" style={{ color: includeFood ? '#ea580c' : '#64748b' }}>
                  &#8377; {foodCost.toLocaleString('en-IN')}
                </span>
              </label>
            </li>
          )}

          <li className="d-flex justify-content-between align-items-center py-2 cursor-pointer border-bottom-0 px-1">
            <label className="d-flex align-items-center gap-3 m-0 cursor-pointer w-100 p-2 rounded-3" style={{ transition: 'background-color 0.2s', backgroundColor: includeAC ? '#eff6ff' : 'transparent' }}>
              <div className="form-check m-0">
                <input
                  type="checkbox"
                  className="form-check-input mt-0 shadow-sm cursor-pointer border-secondary"
                  style={{ width: '1.3em', height: '1.3em' }}
                  checked={includeAC}
                  onChange={(e) => setIncludeAC(e.target.checked)}
                />
              </div>
              <span className="text-secondary fw-medium user-select-none d-flex flex-column">
                <span className="text-dark">Add AC Usage</span>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>Est. &#8377;1,500/mo</small>
              </span>
              <span className="fw-bold ms-auto" style={{ color: includeAC ? '#2563eb' : '#64748b' }}>
                &#8377; {acCost.toLocaleString('en-IN')}
              </span>
            </label>
          </li>
        </ul>

        <div className="d-flex justify-content-between align-items-center p-4 rounded-4 shadow-xl mt-4" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white' }}>
          <div>
            <span className="text-uppercase d-block fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px', opacity: 0.8 }}>Estimated Total</span>
            <span className="fw-bold d-block mt-1" style={{ fontSize: '1.0rem' }}>Your Monthly Cost</span>
          </div>
          <span className="fw-bold" style={{ color: '#fbbf24', fontSize: '1.6rem' }}>
            &#8377; {total.toLocaleString('en-IN')}
          </span>
        </div>

      </div>
    </div>
  );
}