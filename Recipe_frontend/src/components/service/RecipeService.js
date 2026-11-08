import api from "./api";

// Sample mock data for fallback when backend API is offline
const MOCK_RECIPES = [
  {
    id: 1,
    title: "Classic Margherita Pizza",
    description: "Crispy crust topped with fresh mozzarella, ripe tomatoes, fragrant basil leaves, and olive oil.",
    category: "Dinner",
    cuisine: "Italian",
    prepTime: "15 mins",
    cookTime: "15 mins",
    servings: 4,
    rating: 4.8,
    reviewsCount: 24,
    ingredients: [
      "Pizza dough (store-bought or homemade)",
      "1/2 cup San Marzano tomato sauce",
      "200g Fresh mozzarella cheese, sliced",
      "Fresh basil leaves",
      "2 tbsp Extra virgin olive oil",
      "Salt & black pepper to taste"
    ],
    instructions: "1. Preheat oven to 450°F (230°C).\n2. Roll out dough on a baking sheet.\n3. Spread tomato sauce evenly.\n4. Top with fresh mozzarella slices.\n5. Bake for 12-15 mins until crust is golden brown.\n6. Garnish with fresh basil and drizzle olive oil.",
    imageUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Creamy Chicken Tikka Masala",
    description: "Tender marinated chicken pieces grilled and simmered in a rich, spiced tomato and cream gravy.",
    category: "Dinner",
    cuisine: "Indian",
    prepTime: "20 mins",
    cookTime: "30 mins",
    servings: 4,
    rating: 4.9,
    reviewsCount: 38,
    ingredients: [
      "500g Chicken breast, cubed",
      "1 cup Plain yogurt",
      "2 tbsp Tikka masala spice blend",
      "1 cup Tomato puree",
      "1/2 cup Heavy cream",
      "1 Onion, finely chopped",
      "3 cloves Garlic & 1 inch Ginger, minced"
    ],
    instructions: "1. Marinate chicken in yogurt and spices for 30 mins.\n2. Sear chicken in a pan until browned.\n3. Saute onion, garlic, and ginger until fragrant.\n4. Add tomato puree and spices, simmer for 15 mins.\n5. Stir in heavy cream and cooked chicken.\n6. Serve hot with garlic naan or basmati rice.",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Fluffy Berry Pancakes",
    description: "Golden buttermilk pancakes stacked high and topped with fresh blueberries, strawberries, and maple syrup.",
    category: "Breakfast",
    cuisine: "American",
    prepTime: "10 mins",
    cookTime: "10 mins",
    servings: 3,
    rating: 4.7,
    reviewsCount: 19,
    ingredients: [
      "2 cups All-purpose flour",
      "2 tbsp Sugar",
      "2 tsp Baking powder",
      "1 1/2 cups Buttermilk",
      "2 Eggs",
      "Fresh blueberries & strawberries",
      "Pure maple syrup"
    ],
    instructions: "1. Whisk flour, sugar, and baking powder in a bowl.\n2. Mix buttermilk, eggs, and melted butter in another bowl.\n3. Combine wet and dry ingredients gently.\n4. Cook 1/4 cup batter per pancake on a hot skillet.\n5. Flip when bubbles form on surface.\n6. Serve warm with fresh berries and maple syrup.",
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Avocado & Poached Egg Toast",
    description: "Sourdough toast topped with creamy mashed avocado, perfectly poached eggs, chilli flakes, and microgreens.",
    category: "Breakfast",
    cuisine: "American",
    prepTime: "10 mins",
    cookTime: "5 mins",
    servings: 2,
    rating: 4.6,
    reviewsCount: 15,
    ingredients: [
      "2 slices Sourdough bread",
      "1 Ripe avocado",
      "2 Fresh eggs",
      "1 tbsp Lemon juice",
      "Red pepper flakes",
      "Salt and freshly cracked black pepper"
    ],
    instructions: "1. Toast sourdough slices until golden brown.\n2. Mash avocado with lemon juice, salt, and pepper.\n3. Poach eggs in simmering water with vinegar for 3 minutes.\n4. Spread avocado on toast, top with poached eggs.\n5. Sprinkle red pepper flakes and serve.",
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    title: "Decadent Chocolate Lava Cake",
    description: "Warm, rich chocolate cake with a molten liquid chocolate center served with vanilla ice cream.",
    category: "Dessert",
    cuisine: "French",
    prepTime: "15 mins",
    cookTime: "12 mins",
    servings: 2,
    rating: 4.9,
    reviewsCount: 42,
    ingredients: [
      "100g Semi-sweet dark chocolate",
      "100g Unsalted butter",
      "2 Large eggs + 2 egg yolks",
      "1/2 cup Confectioners' sugar",
      "3 tbsp All-purpose flour",
      "Vanilla ice cream for serving"
    ],
    instructions: "1. Melt chocolate and butter together in a heatproof bowl.\n2. Whisk eggs, yolks, and sugar until pale.\n3. Fold chocolate mixture and flour into eggs.\n4. Pour into buttered ramekins.\n5. Bake at 425°F (220°C) for 12 minutes.\n6. Invert onto plate and serve warm with ice cream.",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    title: "Authentic Greek Salad",
    description: "Crisp cucumbers, juicy vine tomatoes, Kalamata olives, thinly sliced red onions, and thick feta cheese slab.",
    category: "Lunch",
    cuisine: "Greek",
    prepTime: "15 mins",
    cookTime: "0 mins",
    servings: 4,
    rating: 4.5,
    reviewsCount: 18,
    ingredients: [
      "3 Ripe tomatoes, cut into wedges",
      "1 Cucumber, sliced",
      "1/2 Red onion, sliced",
      "1/2 cup Kalamata olives",
      "200g Greek feta cheese",
      "1/4 cup Extra virgin olive oil",
      "1 tsp Dried oregano"
    ],
    instructions: "1. Combine tomatoes, cucumber, onion, and olives in a bowl.\n2. Drizzle generously with olive oil and red wine vinegar.\n3. Top with feta cheese slab.\n4. Sprinkle dried oregano, salt, and pepper.",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
  }
];

// LocalStorage persistence for recipes
const LOCAL_STORAGE_RECIPES_KEY = "cookshare_recipes";
const getPersistedRecipes = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_RECIPES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Error reading stored recipes", e);
  }
  return [...MOCK_RECIPES];
};

const savePersistedRecipes = (recipes) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_RECIPES_KEY, JSON.stringify(recipes));
  } catch (e) {
    console.warn("Error persisting recipes", e);
  }
};

let localRecipes = getPersistedRecipes();

const normalizeRecipeImage = (recipe) => {
  if (!recipe) return recipe;
  let img = recipe.imageUrl || recipe.imageDto?.downloadUrl || recipe.imageDto?.downloadURL || recipe.image || recipe.photoUrl || recipe.photo || recipe.imagePath || "";
  if (typeof img === "object" && img !== null) {
    img = img.downloadUrl || img.imageUrl || "";
  }
  return {
    ...recipe,
    imageUrl: img,
    image: img,
    photoUrl: img,
    photo: img,
    imagePath: img,
  };
};

// Upload recipe image file to backend API
export const uploadRecipeImage = async (recipeId, fileOrBase64) => {
  if (!fileOrBase64 || !recipeId) return null;
  try {
    let fileToUpload = fileOrBase64;
    if (typeof fileOrBase64 === "string" && fileOrBase64.startsWith("data:image/")) {
      const arr = fileOrBase64.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const ext = mime.split("/")[1] || "jpeg";
      fileToUpload = new File([u8arr], `recipe_${recipeId}.${ext}`, { type: mime });
    }

    if (fileToUpload instanceof File || fileToUpload instanceof Blob) {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("recipeId", recipeId);

      const response = await api.post(`/api/images/upload?recipeId=${recipeId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
  } catch (error) {
    console.warn("Backend API /api/images/upload notice:", error);
  }
  return null;
};

// Fetch all recipes
export const getAllRecipes = async () => {
  try {
    const response = await api.get("/api/recipes");
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data.map(normalizeRecipeImage);
    }
  } catch (error) {
    try {
      const response = await api.get("/recipes");
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data.map(normalizeRecipeImage);
      }
    } catch (err) {
      console.warn("Backend API offline or unavailable, using client store recipes.");
    }
  }
  localRecipes = getPersistedRecipes();
  return localRecipes.map(normalizeRecipeImage);
};

// Fetch single recipe by ID
export const getRecipeById = async (recipeId) => {
  try {
    const response = await api.get(`/api/recipes/${recipeId}`);
    return normalizeRecipeImage(response.data);
  } catch (error) {
    try {
      const response = await api.get(`/recipes/${recipeId}`);
      return normalizeRecipeImage(response.data);
    } catch (err) {
      console.warn("Backend API offline, fetching recipe from local store.");
    }
  }
  localRecipes = getPersistedRecipes();
  const found = localRecipes.find((r) => String(r.id) === String(recipeId));
  if (found) return normalizeRecipeImage(found);
  throw new Error("Recipe not found");
};

// Create recipe
export const createRecipe = async (recipeData, imageFile = null) => {
  const formattedIngredients = typeof recipeData.ingredients === "string"
    ? recipeData.ingredients.split("\n").map((i) => i.trim()).filter(Boolean)
    : (Array.isArray(recipeData.ingredients) ? recipeData.ingredients : []);

  const img = recipeData.imageUrl || recipeData.image || recipeData.photoUrl || recipeData.photo || recipeData.imagePath || "";

  const payload = {
    ...recipeData,
    imageUrl: img,
    image: img,
    photoUrl: img,
    photo: img,
    imagePath: img,
    instruction: recipeData.instruction || recipeData.instructions || "",
    instructions: recipeData.instructions || recipeData.instruction || "",
    ingredients: formattedIngredients,
    username: recipeData.username || localStorage.getItem("username") || "Guest",
  };

  let createdRecipe = null;

  try {
    const response = await api.post("/api/recipes", payload);
    createdRecipe = normalizeRecipeImage(response.data);
  } catch (error) {
    try {
      const response = await api.post("/recipes", payload);
      createdRecipe = normalizeRecipeImage(response.data);
    } catch (err) {
      console.warn("Backend API offline, saving recipe to local store.", err);
    }
  }

  if (!createdRecipe) {
    createdRecipe = {
      ...payload,
      id: Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      imageUrl: img || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      image: img || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      photoUrl: img,
      photo: img,
      imagePath: img
    };
  }

  // Attempt backend image upload if image provided
  if (createdRecipe.id && (imageFile || img)) {
    const uploadedImage = await uploadRecipeImage(createdRecipe.id, imageFile || img);
    if (uploadedImage && uploadedImage.downloadUrl) {
      createdRecipe.imageDto = uploadedImage;
      createdRecipe.imageUrl = uploadedImage.downloadUrl;
    }
  }

  const finalRecipe = normalizeRecipeImage({
    ...createdRecipe,
    imageUrl: createdRecipe.imageUrl || img,
    image: createdRecipe.image || img
  });

  localRecipes = [finalRecipe, ...localRecipes.filter(r => String(r.id) !== String(finalRecipe.id))];
  savePersistedRecipes(localRecipes);
  return finalRecipe;
};

// Update recipe
export const updateRecipe = async (recipeId, recipeData, imageFile = null) => {
  const formattedIngredients = typeof recipeData.ingredients === "string"
    ? recipeData.ingredients.split("\n").map((i) => i.trim()).filter(Boolean)
    : (Array.isArray(recipeData.ingredients) ? recipeData.ingredients : []);

  const img = recipeData.imageUrl || recipeData.image || recipeData.photoUrl || recipeData.photo || recipeData.imagePath || "";

  const payload = {
    ...recipeData,
    imageUrl: img,
    image: img,
    photoUrl: img,
    photo: img,
    imagePath: img,
    instruction: recipeData.instruction || recipeData.instructions || "",
    instructions: recipeData.instructions || recipeData.instruction || "",
    ingredients: formattedIngredients,
  };

  let updatedRecipe = null;

  try {
    const response = await api.put(`/api/recipes/${recipeId}`, payload);
    updatedRecipe = normalizeRecipeImage(response.data);
  } catch (error) {
    try {
      const response = await api.put(`/recipes/${recipeId}`, payload);
      updatedRecipe = normalizeRecipeImage(response.data);
    } catch (err) {
      console.warn("Backend API offline, updating recipe in local store.", err);
    }
  }

  if (!updatedRecipe) {
    updatedRecipe = normalizeRecipeImage({ ...payload, id: recipeId });
  }

  // Attempt backend image upload if new image provided
  if (recipeId && (imageFile || img)) {
    const uploadedImage = await uploadRecipeImage(recipeId, imageFile || img);
    if (uploadedImage && uploadedImage.downloadUrl) {
      updatedRecipe.imageDto = uploadedImage;
      updatedRecipe.imageUrl = uploadedImage.downloadUrl;
    }
  }

  const finalRecipe = normalizeRecipeImage({
    ...updatedRecipe,
    imageUrl: updatedRecipe.imageUrl || img,
    image: updatedRecipe.image || img
  });

  localRecipes = localRecipes.map((r) => String(r.id) === String(recipeId) ? finalRecipe : r);
  savePersistedRecipes(localRecipes);
  return finalRecipe;
};

// Delete recipe
export const deleteRecipe = async (recipeId) => {
  try {
    await api.delete(`/api/recipes/${recipeId}`);
  } catch (error) {
    try {
      await api.delete(`/recipes/${recipeId}`);
    } catch (err) {
      console.warn("Backend delete notice:", err);
    }
  }

  localRecipes = getPersistedRecipes().filter((r) => String(r.id) !== String(recipeId));
  savePersistedRecipes(localRecipes);
  return true;
};

// Fetch user by username
export const getUser = async (username) => {
  if (!username) return "";
  try {
    const response = await api.get(`/api/users?username=${encodeURIComponent(username)}`);
    return response.data || "";
  } catch (error) {
    try {
      const response = await api.get(`/users?username=${encodeURIComponent(username)}`);
      return response.data || "";
    } catch (err) {
      // Return empty string gracefully so no unhandled error triggers
      return "";
    }
  }
};

// Likes API integration
export const likeRecipeApi = async (recipeId) => {
  try {
    const response = await api.post(`/api/likes/recipe/${recipeId}/like`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const unLikeRecipeApi = async (recipeId) => {
  try {
    const response = await api.post(`/api/likes/recipe/${recipeId}/unLike`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getLikesCountApi = async (recipeId) => {
  try {
    const response = await api.get(`/api/likes/recipe/${recipeId}/like-count`);
    return response.data;
  } catch (error) {
    return null;
  }
};

// Reviews API integration
export const addReviewApi = async (recipeId, reviewData) => {
  try {
    const payload = {
      username: reviewData.userName || reviewData.username || "Guest",
      stars: Number(reviewData.rating || reviewData.stars || 5),
      feedBack: reviewData.comment || reviewData.feedBack || ""
    };
    const response = await api.post(`/api/reviews/recipe/${recipeId}/review`, payload);
    return response.data;
  } catch (error) {
    return null;
  }
};

// Authentication APIs (Seamless Online + Offline Fallback)
export const loginApi = async (credentials) => {
  try {
    const response = await api.post("/api/auth/login", credentials);
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    // If backend is unreachable (network error or connection refused), authenticate locally
    if (!error.response || error.response.status >= 500) {
      console.warn("Backend unavailable, activating local session fallback");
      const fallbackUser = {
        token: "demo-jwt-token-" + Date.now(),
        type: "Bearer",
        id: Date.now(),
        username: credentials.username,
        email: `${credentials.username}@cookshare.local`,
        fullName: credentials.username,
        role: "ROLE_USER"
      };
      localStorage.setItem("token", fallbackUser.token);
      localStorage.setItem("username", fallbackUser.username);
      localStorage.setItem("user", JSON.stringify(fallbackUser));
      return fallbackUser;
    }
    throw error;
  }
};

export const registerApi = async (userData) => {
  try {
    const response = await api.post("/api/auth/register", userData);
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      console.warn("Backend unavailable, registering user in local session");
      const fallbackUser = {
        token: "demo-jwt-token-" + Date.now(),
        type: "Bearer",
        id: Date.now(),
        username: userData.username,
        email: userData.email || `${userData.username}@cookshare.local`,
        fullName: userData.fullName || userData.username,
        role: "ROLE_USER"
      };
      localStorage.setItem("token", fallbackUser.token);
      localStorage.setItem("username", fallbackUser.username);
      localStorage.setItem("user", JSON.stringify(fallbackUser));
      return fallbackUser;
    }
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Bookmarks & User Recipes
export const toggleBookmarkApi = async (recipeId) => {
  try {
    const response = await api.post(`/api/users/bookmarks/${recipeId}`);
    return response.data;
  } catch (e) {
    // Local toggle fallback
    const key = "cookshare_user_bookmarks";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    const idStr = String(recipeId);
    let updated;
    if (existing.includes(idStr)) {
      updated = existing.filter(id => id !== idStr);
    } else {
      updated = [...existing, idStr];
    }
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  }
};

export const getBookmarksApi = async () => {
  try {
    const response = await api.get("/api/users/bookmarks");
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }
  } catch (e) {
    // Local fallback
  }

  const key = "cookshare_user_bookmarks";
  const bookmarkedIds = JSON.parse(localStorage.getItem(key) || "[]");
  const all = getPersistedRecipes();
  return all.filter((r) => bookmarkedIds.includes(String(r.id)));
};

export const getMyRecipesApi = async () => {
  try {
    const response = await api.get("/api/users/my-recipes");
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }
  } catch (e) {
    // Local fallback
  }

  const currentUsername = localStorage.getItem("username");
  if (currentUsername) {
    const all = getPersistedRecipes();
    return all.filter((r) => 
      (r.username && r.username.toLowerCase() === currentUsername.toLowerCase()) || 
      (r.user?.username && r.user.username.toLowerCase() === currentUsername.toLowerCase())
    );
  }
  return [];
};
