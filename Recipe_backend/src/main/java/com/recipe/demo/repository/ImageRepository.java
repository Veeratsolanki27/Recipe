package com.recipe.demo.repository;

import com.recipe.demo.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Image findByRecipeId(Long recipeId);
    void deleteByRecipeId(Long recipeId);
}
