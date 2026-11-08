package com.recipe.demo.request;

import com.recipe.demo.model.Recipe;
import com.recipe.demo.model.User;
import lombok.Data;

import java.util.List;

@Data
public class CreateRecipeRequest {
    private Recipe recipe;
    private User user;

    // Flat fields for direct frontend JSON submission
    private String title;
    private String description;
    private String category;
    private String cuisine;
    private String prepTime;
    private String cookTime;
    private String instruction;
    private String instructions;
    private List<String> ingredients;
    private String username;

    public Recipe getRecipe() {
        if (recipe != null) {
            return recipe;
        }
        Recipe r = new Recipe();
        r.setTitle(title);
        r.setDescription(description);
        r.setCategory(category);
        r.setCuisine(cuisine);
        r.setPrepTime(prepTime);
        r.setCookTime(cookTime);
        r.setInstruction(instruction != null ? instruction : instructions);
        r.setIngredients(ingredients);
        return r;
    }

    public User getUser() {
        if (user != null) {
            return user;
        }
        String name = (username != null && !username.trim().isEmpty()) ? username : "Guest";
        return new User(name);
    }
}
