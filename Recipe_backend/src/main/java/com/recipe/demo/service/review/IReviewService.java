package com.recipe.demo.service.review;

import com.recipe.demo.request.ReviewRequest;

public interface IReviewService {
    void addReview(Long recipeId, ReviewRequest request);
    void deleteReview(Long recipeId, Long reviewId);
    int getTotalReviews(Long recipeId);
}

