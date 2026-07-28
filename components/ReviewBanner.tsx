import { Star } from 'lucide-react';

export function ReviewBanner() {
  return (
    <div className="reviewBanner" aria-label="Google review summary">
      <img src="/assets/google-g-logo.svg" alt="Google" />
      <strong>4.9</strong>
      <span className="reviewStars" aria-label="Five stars">
        {Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" />)}
      </span>
      <span>Based on 1,000+ Google reviews</span>
    </div>
  );
}
