package com.recipe.demo.controller;

import com.recipe.demo.service.like.ILikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/likes")
@RestController
public class LikeController {
    private final ILikeService likeService;

    @PostMapping("/recipe/{recipeId}/like")
    public ResponseEntity<Integer> likeRecipe(@PathVariable Long recipeId){
        int like = likeService.likeRecipe(recipeId);
        return ResponseEntity.ok(like);
    }

    @RequestMapping(value = "/recipe/{recipeId}/unLike", method = {RequestMethod.PUT, RequestMethod.POST, RequestMethod.DELETE})
    public ResponseEntity<Integer> unLikeRecipe(@PathVariable Long recipeId){
        int like = likeService.unLikeRecipe(recipeId);
        return ResponseEntity.ok(like);
    }

    @GetMapping("/recipe/{recipeId}/like-count")
    public ResponseEntity<Long> getLikesCount(@PathVariable Long recipeId){
        Long count = likeService.getLikesCount(recipeId);
        return ResponseEntity.ok(count);
    }
}
