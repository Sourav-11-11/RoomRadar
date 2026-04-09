import React, { useState } from 'react';

export default function InteractiveReviews({ listingId, initialReviews, currentUser }) {
  const [filterRating, setFilterRating] = useState(0);

  let filteredReviews = initialReviews;
  if (filterRating > 0) {
    filteredReviews = initialReviews.filter(review => {
      const sum = (review.foodQuality || 0) +
                  (review.cleanliness || 0) +
                  (review.wifi || 0) +
                  (review.noise || 0) +
                  (review.safety || 0) +
                  (review.ownerBehavior || 0);
      const avg = sum / 6;
      return Math.round(avg) >= filterRating;
    });
  }

  const totalReviews = initialReviews.length;
  let overallAvg = 0;
  if (totalReviews > 0) {
    const totalSum = initialReviews.reduce((acc, review) => {
      return acc + (
        (review.foodQuality || 0) +
        (review.cleanliness || 0) +
        (review.wifi || 0) +
        (review.noise || 0) +
        (review.safety || 0) +
        (review.ownerBehavior || 0)
      ) / 6;
    }, 0);
    overallAvg = (totalSum / totalReviews).toFixed(1);
  }

  return (
    <div className="mb-5 mt-4">
      <hr className="my-4" />
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h4 className="m-0 fw-bold">
            Interactive Reviews <span className="badge bg-dark rounded-pill ms-2">{totalReviews}</span>
            {totalReviews > 0 && (
              <span className="badge bg-warning text-dark ms-2"><i className="fa-solid fa-star me-1"></i>{overallAvg}/5 Overall</span>
            )}
          </h4>
        </div>
        <div>
          <label className="form-label mb-1 text-muted small fw-bold">Filter by minimum rating:</label>
          <select
            className="form-select shadow-sm"
            style={{width: 'auto', minWidth: '150px'}}
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
          >
            <option value={0}>Show All Reviews</option>
            <option value={5}>5★ Only</option>
            <option value={4}>4★ and up</option>
            <option value={3}>3★ and up</option>
          </select>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="alert alert-light border p-4 text-center">
          <p className="text-muted fst-italic mb-0">No reviews match your selected filter.</p>
        </div>
      ) : (
        <div className="row mt-4">
          {filteredReviews.map(review => {
            const isOwner = currentUser && review.author && currentUser === review.author._id;

            const reviewAvg = Math.round((
              (review.foodQuality || 0) +
              (review.cleanliness || 0) +
              (review.wifi || 0) +
              (review.noise || 0) +
              (review.safety || 0) +
              (review.ownerBehavior || 0)
            ) / 6);

            return (
              <div key={review._id} className="col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm" style={{backgroundColor: '#fff', borderRadius: '12px'}}>
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center me-3" style={{width: '45px', height: '45px', fontSize: '1.2rem', fontWeight: '600'}}>
                        {review.author ? review.author.username.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0 fw-bold">{review.author ? review.author.username : "Anonymous Student"}</h6>
                        {review.createdAt && (
                          <small className="text-muted">{new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</small>
                        )}
                      </div>
                      {isOwner && (
                        <form method="POST" action={`/listings/${listingId}/reviews/${review._id}?_method=DELETE`} style={{ display: 'inline' }}>
                          <button type="submit" className="btn btn-sm btn-outline-danger rounded-pill px-3">Discard</button>
                        </form>
                      )}
                    </div>

                    <div className="mb-3 text-warning">
                      {Array.from({length: 5}).map((_, i) => (
                        <i key={i} className={`fa-solid fa-star ${i >= reviewAvg ? 'text-muted opacity-25' : ''}`}></i>
                      ))}
                    </div>

                    <div className="d-flex flex-wrap gap-2 mb-3 small">
                      <span className="badge" style={{backgroundColor: '#f1f5f9', color: '#475569'}}>Food: {review.foodQuality || '-'}</span>    
                      <span className="badge" style={{backgroundColor: '#f1f5f9', color: '#475569'}}>Clean: {review.cleanliness || '-'}</span>   
                      <span className="badge" style={{backgroundColor: '#f1f5f9', color: '#475569'}}>WiFi: {review.wifi || '-'}</span>
                      <span className="badge" style={{backgroundColor: '#f1f5f9', color: '#475569'}}>Noise: {review.noise || '-'}</span>
                      <span className="badge" style={{backgroundColor: '#f1f5f9', color: '#475569'}}>Safety: {review.safety || '-'}</span>       
                      <span className="badge" style={{backgroundColor: '#f1f5f9', color: '#475569'}}>Owner: {review.ownerBehavior || '-'}</span> 
                    </div>
                    <p className="card-text mb-0" style={{ fontSize: '1rem', lineHeight: '1.6', color: '#334155' }}>
                      "{review.comment}"
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}