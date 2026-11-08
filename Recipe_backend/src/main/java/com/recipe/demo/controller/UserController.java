package com.recipe.demo.controller;

import com.recipe.demo.dto.RecipeDto;
import com.recipe.demo.dto.UserDto;
import com.recipe.demo.model.User;
import com.recipe.demo.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;
    private final ModelMapper modelMapper;

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody User user) {
        User theUser = userService.registerUser(user);
        return ResponseEntity.ok(modelMapper.map(theUser, UserDto.class));
    }

    @GetMapping
    public ResponseEntity<UserDto> findUserByUsername(@RequestParam String username) {
        User theUser = userService.findByUsername(username);
        if (theUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(modelMapper.map(theUser, UserDto.class));
    }

    @PostMapping("/bookmarks/{recipeId}")
    public ResponseEntity<Void> toggleBookmark(@PathVariable Long recipeId, Authentication authentication) {
        String username = authentication != null ? authentication.getName() : null;
        if (username == null) {
            return ResponseEntity.status(401).build();
        }
        userService.toggleBookmark(username, recipeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<List<RecipeDto>> getBookmarks(Authentication authentication) {
        String username = authentication != null ? authentication.getName() : null;
        if (username == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(userService.getUserBookmarks(username));
    }

    @GetMapping("/my-recipes")
    public ResponseEntity<List<RecipeDto>> getMyRecipes(Authentication authentication) {
        String username = authentication != null ? authentication.getName() : null;
        if (username == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(userService.getUserRecipes(username));
    }
}
