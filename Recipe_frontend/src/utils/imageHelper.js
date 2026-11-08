// Utility to resolve recipe image URLs reliably with beautiful high-res fallbacks

const FALLBACK_FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
];

export const getRecipeImage = (recipe) => {
  if (!recipe) return FALLBACK_FOOD_IMAGES[0];
  if (typeof recipe === "string") {
    if (recipe.startsWith("http://") || recipe.startsWith("https://") || recipe.startsWith("data:image/")) {
      return recipe;
    }
    if (recipe.length > 100 && !recipe.includes("/")) {
      return `data:image/jpeg;base64,${recipe}`;
    }
  }

  const img = typeof recipe === "object"
    ? (recipe.imageUrl || recipe.imageDto?.downloadUrl || recipe.imageDto?.downloadURL || recipe.photoUrl || recipe.image || recipe.photo || recipe.imagePath)
    : recipe;

  if (img && typeof img === "string" && img.trim() !== "") {
    if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:image/")) {
      return img;
    }
    // If it's a base64 string without header
    if (img.length > 100 && !img.includes("/")) {
      return `data:image/jpeg;base64,${img}`;
    }
    // Relative path from backend
    if (img.startsWith("/")) {
      return `http://localhost:8080${img}`;
    }
    return `http://localhost:8080/api/recipes/image/${img}`;
  }

  // If recipe has an ID, try photo endpoint or hash to consistent fallback
  const idNum = typeof recipe?.id === "number" ? recipe.id : (recipe?.id ? String(recipe.id).charCodeAt(0) : 0);
  const fallbackIndex = Math.abs(idNum) % FALLBACK_FOOD_IMAGES.length;
  return FALLBACK_FOOD_IMAGES[fallbackIndex];
};

export const handleImageError = (e, fallbackIndex = 0) => {
  const fallback = FALLBACK_FOOD_IMAGES[fallbackIndex % FALLBACK_FOOD_IMAGES.length];
  if (e.target.src !== fallback) {
    e.target.src = fallback;
  }
};
