package com.recipe.demo.service.review;

import com.recipe.demo.model.Recipe;
import com.recipe.demo.model.Review;
import com.recipe.demo.model.User;
import com.recipe.demo.repository.RecipeRepository;
import com.recipe.demo.repository.ReviewRepository;
import com.recipe.demo.repository.UserRepository;
import com.recipe.demo.request.ReviewRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService implements IReviewService {

    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    @Override
    public void addReview(Long recipeId, ReviewRequest request) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));

        User user = resolveUser(request);

        reviewRepository.findByRecipeIdAndUserId(recipeId, user.getId())
                .ifPresentOrElse(existingReview -> updateReview(existingReview, request),
                        () -> createNewReview(request, recipe, user));

        updateRecipeRatingStats(recipeId);
    }

    private User resolveUser(ReviewRequest request) {
        if (request.getUserId() != null) {
            return userRepository.findById(request.getUserId())
                    .orElseGet(() -> findOrCreateUserByUsername(request.getUsername()));
        }
        return findOrCreateUserByUsername(request.getUsername());
    }

    private User findOrCreateUserByUsername(String username) {
        String name = (username != null && !username.trim().isEmpty()) ? username.trim() : "Guest";
        User existing = userRepository.findByUsername(name);
        if (existing != null) {
            return existing;
        }
        return userRepository.save(new User(name));
    }

    private void updateReview(Review existingReview, ReviewRequest request){
        existingReview.setStars(request.getStars());
        existingReview.setFeedBack(request.getFeedBack());
        reviewRepository.save(existingReview);
    }

    private void createNewReview(ReviewRequest request, Recipe recipe, User user){
        Review newReview = new Review();
        newReview.setUser(user);
        newReview.setStars(request.getStars());
        newReview.setFeedBack(request.getFeedBack());
        newReview.setRecipe(recipe);
        reviewRepository.save(newReview);
    }

    @Override
    public void deleteReview(Long recipeId, Long reviewId) {
        reviewRepository.findById(reviewId).ifPresentOrElse(review -> {
            reviewRepository.delete(review);
            updateRecipeRatingStats(recipeId);
        }, () -> {
            throw new EntityNotFoundException("Review not found!");
        });
    }

    private void updateRecipeRatingStats(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));
        List<Review> allReviews = reviewRepository.findAllByRecipeId(recipeId);
        double averageRating = allReviews.stream()
                .mapToInt(Review::getStars)
                .average()
                .orElse(0.0);
        recipe.setAverageRating(averageRating);
        recipe.setTotalRateCount(allReviews.size());
        recipeRepository.save(recipe);
    }

    @Override
    @Transactional(readOnly = true)
    public int getTotalReviews(Long recipeId) {
        return reviewRepository.countAllByRecipeId(recipeId);
    }
}
