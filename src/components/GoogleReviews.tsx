import { useEffect, useState } from 'react';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string;
}

const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This calls the secure Vercel API we just created
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.reviews) {
          // Filter out empty reviews and grab the top 3
          const validReviews = data.reviews.filter((r: Review) => r.text.trim() !== '');
          setReviews(validReviews.slice(0, 3));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return null; // Keeps the page clean while loading
  if (reviews.length === 0) return null;

  return (
    <section className="py-16 bg-stone-50 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">What Our Guests Say</h2>
          <p className="text-neutral-600">Real reviews from our amazing customers on Google</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 flex flex-col h-full">
              {/* Star Rating */}
              <div className="flex text-yellow-400 mb-4 text-xl">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              
              {/* Review Text */}
              <p className="text-neutral-700 italic flex-grow mb-8 line-clamp-4">
                "{review.text}"
              </p>
              
              {/* Author Profile */}
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-neutral-50">
                <img 
                  src={review.profile_photo_url} 
                  alt={review.author_name} 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-green-900">{review.author_name}</p>
                  <p className="text-xs text-neutral-500">Google Local Guide</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;