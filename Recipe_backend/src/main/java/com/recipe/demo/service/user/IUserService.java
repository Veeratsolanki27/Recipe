package com.recipe.demo.service.user;

import com.recipe.demo.dto.AuthResponse;
import com.recipe.demo.dto.RecipeDto;
import com.recipe.demo.model.User;
import com.recipe.demo.request.LoginRequest;
import com.recipe.demo.request.RegisterRequest;

import java.util.List;

public interface IUserService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    User registerUser(User user);
    User findByUsername(String username);
    void toggleBookmark(String username, Long recipeId);
    List<RecipeDto> getUserBookmarks(String username);
    List<RecipeDto> getUserRecipes(String username);
}
