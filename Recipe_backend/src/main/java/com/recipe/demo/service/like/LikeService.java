package com.recipe.demo.service.like;

import com.recipe.demo.model.Like;
import com.recipe.demo.model.Recipe;
import com.recipe.demo.repository.LikeRepository;
import com.recipe.demo.repository.RecipeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class LikeService implements ILikeService {
    private final RecipeRepository recipeRepository;
    private final LikeRepository likeRepository;

    @Override
    public int likeRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found!"));

        Like like = new Like(recipe);
        likeRepository.save(like);

        recipe.setLikeCount(recipe.getLikeCount() + 1);
        return recipeRepository.save(recipe).getLikeCount();
    }

    @Override
    public int unLikeRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found!"));

        likeRepository.findFirstByRecipeId(recipeId).ifPresent(like -> {
            likeRepository.delete(like);
        });

        if (recipe.getLikeCount() > 0) {
            recipe.setLikeCount(recipe.getLikeCount() - 1);
            recipeRepository.save(recipe);
        }
        return recipe.getLikeCount();
    }

    @Override
    @Transactional(readOnly = true)
    public Long getLikesCount(Long recipeId) {
        return recipeRepository.findById(recipeId)
                .map(recipe -> (long) recipe.getLikeCount())
                .orElse(0L);
    }
}
