package com.recipe.demo.service.user;

import com.recipe.demo.dto.AuthResponse;
import com.recipe.demo.dto.RecipeDto;
import com.recipe.demo.model.Recipe;
import com.recipe.demo.model.User;
import com.recipe.demo.repository.RecipeRepository;
import com.recipe.demo.repository.UserRepository;
import com.recipe.demo.request.LoginRequest;
import com.recipe.demo.request.RegisterRequest;
import com.recipe.demo.security.JwtUtils;
import com.recipe.demo.service.recipe.IRecipeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final IRecipeService recipeService;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username is required");
        }
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters long");
        }

        User existingUser = userRepository.findByUsername(request.getUsername().trim());
        if (existingUser != null) {
            throw new IllegalArgumentException("Username is already taken");
        }

        User user = new User();
        user.setUsername(request.getUsername().trim());
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");

        User savedUser = userRepository.save(user);
        String token = jwtUtils.generateToken(savedUser.getUsername(), savedUser.getRole());

        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .id(savedUser.getId())
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .fullName(savedUser.getFullName())
                .role(savedUser.getRole())
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = userRepository.findByUsername(request.getUsername());
        if (user == null) {
            throw new EntityNotFoundException("User not found");
        }

        String token = jwtUtils.generateToken(user.getUsername(), user.getRole());

        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User registerUser(User user) {
        if (user.getUsername() != null) {
            User existing = userRepository.findByUsername(user.getUsername());
            if (existing != null) {
                return existing;
            }
        }
        if (user.getPassword() != null && !user.getPassword().startsWith("$2a$")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    @Override
    public void toggleBookmark(String username, Long recipeId) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new EntityNotFoundException("User not found: " + username);
        }
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found: " + recipeId));

        if (user.getBookmarks().contains(recipe)) {
            user.getBookmarks().remove(recipe);
        } else {
            user.getBookmarks().add(recipe);
        }
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RecipeDto> getUserBookmarks(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new EntityNotFoundException("User not found: " + username);
        }
        return user.getBookmarks().stream()
                .map(recipeService::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<RecipeDto> getUserRecipes(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new EntityNotFoundException("User not found: " + username);
        }
        return user.getRecipe().stream()
                .map(recipeService::convertToDto)
                .collect(Collectors.toList());
    }
}
