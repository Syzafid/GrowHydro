
import React, { useState } from 'react';
import { Star, StarHalf, StarOff, ArrowUp, ArrowDown, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

// Review type definition
export interface ProductReview {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  title: string;
  comment: string;
  date: Date;
  helpful: number;
  verified: boolean;
  images?: string[];
}

interface ProductReviewsProps {
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, averageRating, totalReviews }) => {
  const [sortOption, setSortOption] = useState<'newest' | 'highest' | 'lowest' | 'helpful'>('helpful');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars
  
  reviews.forEach(review => {
    const ratingIndex = Math.floor(review.rating) - 1;
    if (ratingIndex >= 0 && ratingIndex < 5) {
      ratingCounts[4 - ratingIndex]++; // Reverse index since we display 5 stars first
    }
  });
  
  // Calculate percentages
  const ratingPercentages = ratingCounts.map(count => (count / totalReviews) * 100);
  
  // Sort reviews based on selected option
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return b.date.getTime() - a.date.getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });
  
  // Mock submit review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userRating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    
    if (!reviewTitle.trim()) {
      toast.error("Please add a review title");
      return;
    }
    
    if (!reviewContent.trim()) {
      toast.error("Please add review content");
      return;
    }
    
    toast.success("Thank you for your review! It will be published after moderation.");
    
    // Reset form
    setReviewTitle('');
    setReviewContent('');
    setUserRating(0);
  };
  
  // Find most helpful review
  const topReview = [...reviews].sort((a, b) => b.helpful - a.helpful)[0];
  
  // Mock function to mark a review as helpful
  const markAsHelpful = (reviewId: string) => {
    toast.success("Thank you for your feedback!");
  };
  
  // Render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="text-amber-400 fill-amber-400" size={16} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className="text-amber-400 fill-amber-400" size={16} />);
      } else {
        stars.push(<StarOff key={i} className="text-gray-300" size={16} />);
      }
    }
    
    return stars;
  };
  
  // Render interactive rating stars
  const renderRatingInput = () => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => setUserRating(rating)}
            onMouseEnter={() => setHoveredRating(rating)}
            onMouseLeave={() => setHoveredRating(0)}
            className="text-2xl p-1"
          >
            {(hoveredRating || userRating) >= rating ? (
              <Star className="text-amber-400 fill-amber-400" size={24} />
            ) : (
              <Star className="text-gray-300" size={24} />
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Reviews Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Rating Overview */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-leaf-700 mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex items-center gap-1 mb-3">
            {renderStars(averageRating)}
          </div>
          <p className="text-gray-500">{totalReviews} verified ratings</p>
        </div>
        
        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div key={rating} className="flex items-center gap-2">
              <span className="w-1/12">{rating}★</span>
              <div className="w-8/12 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-amber-400 h-2.5 rounded-full"
                  style={{ width: `${ratingPercentages[index]}%` }}
                ></div>
              </div>
              <span className="w-3/12 text-sm text-gray-500">
                {ratingCounts[index]} ({Math.round(ratingPercentages[index])}%)
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Top Review */}
      {topReview && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Top Review</h3>
          <div className="bg-muted/20 p-6 rounded-lg border">
            <div className="flex items-start">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={topReview.user.avatar} alt={topReview.user.name} />
                <AvatarFallback>{topReview.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">{renderStars(topReview.rating)}</div>
                  {topReview.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <h4 className="font-semibold">{topReview.title}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  by {topReview.user.name} on {topReview.date.toLocaleDateString()}
                </p>
                <p className="mb-4">{topReview.comment}</p>
                
                {topReview.images && topReview.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {topReview.images.map((img, i) => (
                      <div key={i} className="w-16 h-16 rounded-md overflow-hidden border">
                        <img src={img} alt="Review" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center text-sm">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => markAsHelpful(topReview.id)}
                    className="text-gray-600"
                  >
                    <ThumbsUp size={14} className="mr-1" />
                    Helpful ({topReview.helpful})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Review Filter/Sort */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center">
          <span className="text-sm mr-2">Sort by:</span>
          <select 
            className="text-sm border rounded-md py-1 px-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
          >
            <option value="helpful">Most Helpful</option>
            <option value="newest">Newest</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      </div>
      
      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map(review => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={review.user.avatar} alt={review.user.name} />
                <AvatarFallback>{review.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">{renderStars(review.rating)}</div>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <h4 className="font-semibold">{review.title}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  by {review.user.name} on {review.date.toLocaleDateString()}
                </p>
                <p className="mb-4">{review.comment}</p>
                
                {review.images && review.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {review.images.map((img, i) => (
                      <div key={i} className="w-16 h-16 rounded-md overflow-hidden border">
                        <img src={img} alt="Review" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center text-sm">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => markAsHelpful(review.id)}
                    className="text-gray-600"
                  >
                    <ThumbsUp size={14} className="mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Write a Review Form */}
      <div className="mt-12 p-6 border rounded-lg bg-muted/10">
        <h3 className="text-xl font-semibold mb-6">Write a Review</h3>
        <form onSubmit={handleSubmitReview}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Overall Rating</label>
            {renderRatingInput()}
          </div>
          
          <div className="mb-4">
            <label htmlFor="review-title" className="block text-sm font-medium mb-2">
              Review Title
            </label>
            <input
              id="review-title"
              type="text"
              placeholder="Summarize your experience"
              className="w-full p-2 border rounded-md"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="review-content" className="block text-sm font-medium mb-2">
              Review Content
            </label>
            <Textarea
              id="review-content"
              placeholder="What did you like or dislike about this product?"
              rows={5}
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Add Photos (optional)
            </label>
            <div className="flex items-center justify-center border-2 border-dashed rounded-md p-6 cursor-pointer hover:bg-muted/20 transition-colors">
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Drag photos here or click to upload
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  (Maximum 5 images, 5MB each)
                </p>
              </div>
            </div>
          </div>
          
          <Button type="submit">Submit Review</Button>
        </form>
      </div>
    </div>
  );
};

export default ProductReviews;
