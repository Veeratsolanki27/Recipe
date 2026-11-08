import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { likeRecipeApi, unLikeRecipeApi, getLikesCountApi } from "../service/RecipeService";

const Like = ({ recipeId, initialLikesCount, onLikeCountChange }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount || 0);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteRecipes") || "[]");
    setLiked(favorites.includes(recipeId));
    if (recipeId) {
      getLikesCountApi(recipeId).then((cnt) => {
        if (cnt !== null && cnt !== undefined) {
          setLikesCount(cnt);
          if (onLikeCountChange) onLikeCountChange(cnt);
        }
      });
    }
  }, [recipeId]);

  const toggleLike = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem("favoriteRecipes") || "[]");
    let updated;
    const newLikedState = !liked;

    if (liked) {
      updated = favorites.filter((id) => id !== recipeId);
      const newCount = await unLikeRecipeApi(recipeId);
      if (newCount !== null && newCount !== undefined) {
        setLikesCount(newCount);
        if (onLikeCountChange) onLikeCountChange(newCount);
      } else {
        setLikesCount((prev) => Math.max(0, prev - 1));
      }
    } else {
      updated = [...favorites, recipeId];
      const newCount = await likeRecipeApi(recipeId);
      if (newCount !== null && newCount !== undefined) {
        setLikesCount(newCount);
        if (onLikeCountChange) onLikeCountChange(newCount);
      } else {
        setLikesCount((prev) => prev + 1);
      }
    }
    localStorage.setItem("favoriteRecipes", JSON.stringify(updated));
    setLiked(newLikedState);
  };

  return (
    <Button
      variant={liked ? "danger" : "light"}
      size="sm"
      className="rounded-pill shadow-sm d-flex align-items-center justify-content-center px-2 py-1 gap-1"
      onClick={toggleLike}
      title={liked ? "Remove from Favorites" : "Add to Favorites"}
    >
      <span style={{ fontSize: "1rem" }}>{liked ? "❤️" : "🤍"}</span>
      <span className="fw-bold fs-7">{likesCount}</span>
    </Button>
  );
};

export default Like;
