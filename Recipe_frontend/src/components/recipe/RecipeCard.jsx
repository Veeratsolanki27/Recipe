import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getRecipeImage, handleImageError } from "../../utils/imageHelper";
import RatingStars from "../common/RatingStars";
import Like from "../common/Like";
import BookmarkButton from "../common/BookmarkButton";

const RecipeCard = ({ recipe, onDelete }) => {
  const imgSrc = getRecipeImage(recipe);
  const currentUsername = localStorage.getItem("username");
  const author = recipe?.user?.username || recipe?.username;
  const isOwner = Boolean(currentUsername && author && currentUsername.toLowerCase() === author.toLowerCase());

  return (
    <Card className="mb-4 shadow-sm h-100 border-0 recipe-card transition-hover position-relative rounded-4 overflow-hidden">
      <div className="position-absolute top-0 end-0 p-2 z-1 d-flex gap-2">
        <BookmarkButton recipeId={recipe?.id} />
        <Like recipeId={recipe?.id} initialLikesCount={recipe?.likeCount || 0} />
      </div>

      <div style={{ height: "210px", overflow: "hidden" }} className="bg-light position-relative">
        <Card.Img
          variant="top"
          src={imgSrc}
          onError={(e) => handleImageError(e, recipe?.id || 0)}
          alt={recipe?.title || "Recipe image"}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        {recipe?.category && (
          <Badge
            bg="primary"
            className="position-absolute bottom-0 start-0 m-2 px-3 py-2 text-white shadow-sm rounded-pill fw-semibold"
          >
            {recipe.category}
          </Badge>
        )}
      </div>

      <Card.Body className="d-flex flex-column justify-content-between p-3">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="badge bg-secondary-subtle text-secondary border px-2 py-1 text-uppercase" style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}>
              {recipe?.cuisine || "Global"}
            </span>
            <RatingStars rating={recipe?.averageRating || recipe?.rating || 4.5} size="small" />
          </div>

          <Card.Title className="fw-bold fs-5 mb-1 text-truncate" title={recipe?.title}>
            {recipe?.title || recipe?.name || "Delicious Recipe"}
          </Card.Title>

          {author && (
            <p className="text-muted small mb-2">
              By <span className="text-primary fw-semibold">@{author}</span>
            </p>
          )}

          <Card.Text className="text-secondary small mb-3" style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "2.4em"
          }}>
            {recipe?.description || "A delicious step-by-step recipe carefully crafted for food lovers."}
          </Card.Text>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
          <div className="d-flex align-items-center gap-2 text-muted small">
            {recipe?.prepTime && <span>⏱️ {recipe.prepTime}</span>}
          </div>

          <div className="d-flex align-items-center gap-2">
            {isOwner && onDelete && (
              <Button
                variant="outline-danger"
                size="sm"
                className="rounded-pill px-2 py-1"
                onClick={() => onDelete(recipe.id)}
                title="Delete your recipe"
              >
                🗑️
              </Button>
            )}
            <Link to={`/recipe/${recipe?.id}/recipe-details`}>
              <Button variant="outline-primary" size="sm" className="fw-bold rounded-pill px-3">
                View →
              </Button>
            </Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
