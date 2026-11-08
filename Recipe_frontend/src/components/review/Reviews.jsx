import React, { useState, useEffect } from "react";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";
import { addReviewApi } from "../service/RecipeService";

const INITIAL_REVIEWS = [
  {
    id: 1,
    userName: "Chef Alex",
    rating: 5,
    comment: "Turned out absolutely amazing! The instructions were spot-on.",
    date: "2 days ago"
  },
  {
    id: 2,
    userName: "Maria G.",
    rating: 4,
    comment: "Super easy to make and delicious. Will definitely make it again for dinner!",
    date: "1 week ago"
  }
];

const Reviews = ({ recipeId, initialReviews = [] }) => {
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    if (initialReviews && initialReviews.length > 0) {
      setReviewsList(initialReviews);
    } else {
      setReviewsList(INITIAL_REVIEWS);
    }
  }, [initialReviews]);

  const handleAddReview = async (newReview) => {
    setReviewsList([newReview, ...reviewsList]);
    if (recipeId) {
      await addReviewApi(recipeId, newReview);
    }
  };

  return (
    <div className="mt-5 pt-4 border-top">
      <h4 className="fw-bold mb-4">💬 Community Reviews ({reviewsList.length})</h4>
      <ReviewForm onAddReview={handleAddReview} />
      <div className="d-flex flex-column">
        {reviewsList.map((rev, index) => (
          <ReviewItem key={rev.id || index} review={rev} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
