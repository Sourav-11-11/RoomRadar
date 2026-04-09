import React from 'react';
import { createRoot } from 'react-dom/client';
import ListingsFilterGrid from './components/ListingsFilterGrid';
import TrueCostCalculator from './components/TrueCostCalculator';
import InteractiveReviews from './components/InteractiveReviews';

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('react-listings-root');
  if (gridContainer) {
    try {
      const rawData = gridContainer.getAttribute('data-listings');
      const listings = JSON.parse(decodeURIComponent(rawData));
      createRoot(gridContainer).render(<ListingsFilterGrid initialListings={listings} />);
    } catch (e) {
      console.error(e);
    }
  }

  const calcContainer = document.getElementById('react-cost-calculator');
  if (calcContainer) {
    try {
      const rawData = calcContainer.getAttribute('data-listing');
      const listing = JSON.parse(decodeURIComponent(rawData));
      createRoot(calcContainer).render(<TrueCostCalculator listing={listing} />);
    } catch (e) {
      console.error(e);
    }
  }

  const reviewsContainer = document.getElementById('react-interactive-reviews');
  if (reviewsContainer) {
    try {
      const listingId = reviewsContainer.getAttribute('data-listing-id');
      const currentUserStr = reviewsContainer.getAttribute('data-current-user') || null;
      let currentUser = currentUserStr && currentUserStr.length > 0 ? currentUserStr : null;

      const rawData = reviewsContainer.getAttribute('data-reviews');
      const reviews = JSON.parse(decodeURIComponent(rawData));

      createRoot(reviewsContainer).render(
        <InteractiveReviews
          listingId={listingId}
          initialReviews={reviews}
          currentUser={currentUser}
        />
      );
    } catch (e) {
      console.error(e);
    }
  }
});