package com.recipe.demo.controller;

import com.recipe.demo.request.ReviewRequest;
import com.recipe.demo.service.review.IReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final IReviewService reviewService;


    @PostMapping("/recipe/{recipeId}/review")
    public ResponseEntity<Void> rateRecipe(@RequestBody ReviewRequest request, @PathVariable Long recipeId) {
        System.out.println("The request is: " + request.toString());
        reviewService.addReview(recipeId,request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/recipe/{recipeId}/totalRatings")
    public ResponseEntity<Integer> getRateCount(@PathVariable Long recipeId){
        Integer totalRatings = reviewService.getTotalReviews(recipeId);
        return ResponseEntity.ok(totalRatings);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteRating(@RequestParam Long ratingId, @RequestParam Long recipeId){
        reviewService.deleteReview(recipeId, ratingId);
        return ResponseEntity.ok("Rating deleted successfully");
    }
}
