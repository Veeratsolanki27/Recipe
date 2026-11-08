import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toggleBookmarkApi } from "../service/RecipeService";
import { useNavigate } from "react-router-dom";

const BookmarkButton = ({ recipeId, initialIsBookmarked = false }) => {
  const [bookmarked, setBookmarked] = useState(initialIsBookmarked);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      await toggleBookmarkApi(recipeId);
      setBookmarked(!bookmarked);
    } catch (err) {
      console.warn("Bookmark toggle failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={bookmarked ? "warning" : "light"}
      size="sm"
      className="rounded-circle shadow-sm d-flex align-items-center justify-content-center p-2 border"
      style={{ width: "36px", height: "36px" }}
      onClick={handleToggle}
      disabled={loading}
      title={bookmarked ? "Remove Bookmark" : "Save Bookmark"}
    >
      <span style={{ fontSize: "1rem" }}>{bookmarked ? "⭐" : "☆"}</span>
    </Button>
  );
};

export default BookmarkButton;

