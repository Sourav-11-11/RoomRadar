const CATEGORY_KEYS = [
  "foodQuality",
  "cleanliness",
  "wifi",
  "noise",
  "safety",
  "ownerBehavior"
];

const DEFAULT_ESTIMATED_FOOD_COST = 3000;

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function computeTrueMonthlyCost({
  price = 0,
  electricityCost = 0,
  maintenanceCost = 0,
  foodIncluded = false,
  estimatedFoodCost = DEFAULT_ESTIMATED_FOOD_COST
}) {
  const base = toNumber(price);
  const elec = toNumber(electricityCost);
  const maintenance = toNumber(maintenanceCost);
  const food = foodIncluded ? 0 : toNumber(estimatedFoodCost);
  const total = base + elec + maintenance + food;
  return Math.max(0, Math.round(total));
}

function computeReviewComposite(review) {
  const scores = CATEGORY_KEYS
    .map((key) => toNumber(review[key]))
    .filter((n) => Number.isFinite(n) && n > 0);

  if (!scores.length && Number.isFinite(toNumber(review.rating)) && toNumber(review.rating) > 0) {
    scores.push(toNumber(review.rating));
  }

  if (!scores.length) return 0;
  const sum = scores.reduce((a, b) => a + b, 0);
  return Number((sum / scores.length).toFixed(2));
}

function computeRealityScore(reviews = []) {
  if (!reviews || !reviews.length) {
    return { score: 0, reviewCount: 0, average: 0 };
  }

  const composites = reviews
    .map((rev) => computeReviewComposite(rev))
    .filter((val) => Number.isFinite(val) && val > 0);

  const reviewCount = composites.length;
  if (!reviewCount) {
    return { score: 0, reviewCount: 0, average: 0 };
  }

  const average = composites.reduce((a, b) => a + b, 0) / reviewCount;
  const volumeWeight = Math.min(reviewCount / 20, 1);
  const score = Number(((average * 0.85) + (volumeWeight * 5 * 0.15)).toFixed(2));

  return { score, reviewCount, average: Number(average.toFixed(2)) };
}

module.exports = {
  CATEGORY_KEYS,
  DEFAULT_ESTIMATED_FOOD_COST,
  computeTrueMonthlyCost,
  computeReviewComposite,
  computeRealityScore,
};
