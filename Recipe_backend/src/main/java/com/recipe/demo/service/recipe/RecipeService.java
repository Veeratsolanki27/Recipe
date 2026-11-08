package com.recipe.demo.service.recipe;

import com.recipe.demo.dto.ImageDto;
import com.recipe.demo.dto.RecipeDto;
import com.recipe.demo.dto.ReviewDto;
import com.recipe.demo.dto.UserDto;
import com.recipe.demo.model.Image;
import com.recipe.demo.model.Recipe;
import com.recipe.demo.model.Review;
import com.recipe.demo.model.User;
import com.recipe.demo.repository.ImageRepository;
import com.recipe.demo.repository.LikeRepository;
import com.recipe.demo.repository.RecipeRepository;
import com.recipe.demo.repository.ReviewRepository;
import com.recipe.demo.repository.UserRepository;
import com.recipe.demo.request.CreateRecipeRequest;
import com.recipe.demo.request.RecipeUpdateRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class RecipeService implements IRecipeService {
    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final ImageRepository imageRepository;
    private final ReviewRepository reviewRepository;
    private final LikeRepository likeRepository;

    @Override
    public Recipe createRecipe(CreateRecipeRequest request) {
        if(request == null){
            throw new IllegalArgumentException("Invalid request");
        }
        User userReq = request.getUser();
        String username = (userReq != null && userReq.getUsername() != null && !userReq.getUsername().trim().isEmpty())
                ? userReq.getUsername()
                : (request.getUsername() != null && !request.getUsername().trim().isEmpty() ? request.getUsername() : "Guest");

        User user = Optional.ofNullable(userRepository.findByUsername(username))
                .orElseGet(() -> userRepository.save(new User(username)));

        Recipe recipe = IRecipeService.createRecipe(request, user);
        Recipe savedRecipe = recipeRepository.save(recipe);
        if (user.getRecipe() == null) {
            user.setRecipe(new java.util.HashSet<>());
        }
        user.getRecipe().add(savedRecipe);
        userRepository.save(user);
        return savedRecipe;
    }

    @Override
    public Recipe updateRecipe(RecipeUpdateRequest request, Long recipeId) {
        Recipe recipe = getRecipeById(recipeId);
        Recipe theRecipe = IRecipeService.updateRecipe(recipe, request);
        return recipeRepository.save(theRecipe);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));
    }

    @Override
    public void deleteRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
        if (recipe != null) {
            // 1. Remove references from bookmarks of all users
            List<User> usersWithBookmark = userRepository.findAll();
            for (User u : usersWithBookmark) {
                if (u.getBookmarks() != null && u.getBookmarks().remove(recipe)) {
                    userRepository.save(u);
                }
            }

            // 2. Remove references from author's recipe set
            if (recipe.getUser() != null && recipe.getUser().getRecipe() != null) {
                recipe.getUser().getRecipe().remove(recipe);
                userRepository.save(recipe.getUser());
            }

            // 3. Delete all associated likes for this recipe
            likeRepository.deleteByRecipeId(recipeId);

            // 4. Delete all associated reviews for this recipe
            reviewRepository.deleteAllByRecipeId(recipeId);

            // 5. Delete associated image if present
            imageRepository.deleteByRecipeId(recipeId);

            // 6. Delete recipe entity
            recipeRepository.delete(recipe);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Set<String> getAllRecipeCategories() {
        return recipeRepository.findAll()
                .stream()
                .map(Recipe :: getCategory)
                .filter(c -> c != null && !c.trim().isEmpty())
                .collect(Collectors.toSet());
    }

    @Override
    @Transactional(readOnly = true)
    public Set<String> getAllRecipeCuisine() {
        return recipeRepository.findAll()
                .stream()
                .map(Recipe :: getCuisine)
                .filter(c -> c != null && !c.trim().isEmpty())
                .collect(Collectors.toSet());
    }
    @Override
    @Transactional(readOnly = true)
    public List<RecipeDto> getConvertedRecipes(List<Recipe> recipes){
        return recipes.stream().map(this :: convertToDto).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public RecipeDto convertToDto(Recipe recipe){
        RecipeDto recipeDto = modelMapper.map(recipe, RecipeDto.class);
        if (recipe.getUser() != null) {
            UserDto userDto = modelMapper.map(recipe.getUser(), UserDto.class);
            recipeDto.setUser(userDto);
        }

        Image imageEntity = recipe.getImage() != null ? recipe.getImage() : imageRepository.findByRecipeId(recipe.getId());
        if (imageEntity != null) {
            ImageDto imgDto = modelMapper.map(imageEntity, ImageDto.class);
            imgDto.setFileType(imageEntity.getFileType());
            recipeDto.setImageDto(imgDto);
        }

        List<ReviewDto> reviews = reviewRepository.findAllByRecipeId(recipe.getId())
                .stream()
                .map(review -> {
                    ReviewDto rDto = modelMapper.map(review, ReviewDto.class);
                    if (review.getUser() != null) {
                        rDto.setUser(modelMapper.map(review.getUser(), UserDto.class));
                    }
                    return rDto;
                }).toList();

        recipeDto.setLikeCount((long) recipe.getLikeCount());
        recipeDto.setTotalRateCount(recipe.getTotalRateCount());
        recipeDto.setAverageRating(recipe.calculateAverageRatings());
        recipeDto.setInstructions(recipe.getInstruction());
        recipeDto.setReviews(reviews);
        return recipeDto;
    }
}
