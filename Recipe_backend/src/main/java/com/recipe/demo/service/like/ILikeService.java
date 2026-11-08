package com.recipe.demo.service.like;

public interface ILikeService {
    int likeRecipe(Long recipeId);
    int unLikeRecipe(Long recipeId);
    Long getLikesCount(Long recipeId);
}
