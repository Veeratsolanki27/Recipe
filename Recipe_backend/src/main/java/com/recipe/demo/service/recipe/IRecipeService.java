package com.recipe.demo.service.recipe;

import com.recipe.demo.dto.RecipeDto;
import com.recipe.demo.model.Recipe;
import com.recipe.demo.model.User;
import com.recipe.demo.request.CreateRecipeRequest;
import com.recipe.demo.request.RecipeUpdateRequest;

import java.util.List;
import java.util.Set;

public interface IRecipeService {
    Recipe createRecipe(CreateRecipeRequest request);

    List<Recipe> getAllRecipes();

    Recipe getRecipeById(Long id);

    Recipe updateRecipe(RecipeUpdateRequest request, Long recipeId);

    void deleteRecipe(Long recipeId);

    Set<String> getAllRecipeCategories();

    Set<String> getAllRecipeCuisine();


    static Recipe createRecipe(CreateRecipeRequest request, User user) {
        Recipe recipe = new Recipe();
        Recipe createRequest = request.getRecipe();
        recipe.setTitle(createRequest.getTitle());
        recipe.setCuisine(createRequest.getCuisine());
        recipe.setCategory(createRequest.getCategory());
        String instr = createRequest.getInstruction() != null ? createRequest.getInstruction() : createRequest.getInstructions();
        recipe.setInstruction(instr);
        recipe.setDescription(createRequest.getDescription());
        recipe.setPrepTime(createRequest.getPrepTime());
        recipe.setCookTime(createRequest.getCookTime());
        recipe.setIngredients(createRequest.getIngredients());
        recipe.setUser(user);
        return recipe;
    }

    static Recipe updateRecipe(Recipe existingRecipe, RecipeUpdateRequest request){
        if (request.getTitle() != null) existingRecipe.setTitle(request.getTitle());
        if (request.getDescription() != null) existingRecipe.setDescription(request.getDescription());
        if (request.getInstruction() != null) existingRecipe.setInstruction(request.getInstruction());
        if (request.getCuisine() != null) existingRecipe.setCuisine(request.getCuisine());
        if (request.getPrepTime() != null) existingRecipe.setPrepTime(request.getPrepTime());
        if (request.getCookTime() != null) existingRecipe.setCookTime(request.getCookTime());
        if (request.getCategory() != null) existingRecipe.setCategory(request.getCategory());
        if (request.getIngredients() != null) existingRecipe.setIngredients(request.getIngredients());
        return existingRecipe;
    }

    List<RecipeDto> getConvertedRecipes(List<Recipe> recipes);

    RecipeDto convertToDto(Recipe recipe);
}
