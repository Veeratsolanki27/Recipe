import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { getRecipeById, deleteRecipe } from "../service/RecipeService";
import { Container, Card, Badge, Spinner, Alert, Button } from "react-bootstrap";
import { getRecipeImage, handleImageError } from "../../utils/imageHelper";
import PreparationDetails from "../common/PreparationDetails";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstruction from "./RecipeInstruction";
import RecipeDescription from "./RecipeDescription";
import RatingStars from "../common/RatingStars";
import Like from "../common/Like";
import BookmarkButton from "../common/BookmarkButton";
import ImageDownloader from "../image/ImageDownloader";
import Reviews from "../review/Reviews";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data);
      } catch (err) {
        setError(err.message || "Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    };
    if (recipeId) fetchRecipe();
  }, [recipeId]);

  const handleDelete = async () => {
    if (!currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      setDeleting(true);
      try {
        await deleteRecipe(recipeId);
        navigate("/");
      } catch (err) {
        alert("Failed to delete recipe: " + err.message);
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading recipe...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/" className="btn btn-secondary">← Back to Home</Link>
      </Container>
    );
  }

  const imgSrc = getRecipeImage(recipe);

  return (
    <Container className="my-5" style={{ maxWidth: "850px" }}>
      <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
        <div style={{ maxHeight: "420px", overflow: "hidden" }} className="position-relative bg-dark">
          <Card.Img
            variant="top"
            src={imgSrc}
            onError={(e) => handleImageError(e, recipe?.id || 0)}
            style={{ width: "100%", maxHeight: "420px", objectFit: "cover" }}
          />
          <div className="position-absolute top-0 end-0 p-3 z-1 d-flex gap-2">
            <BookmarkButton recipeId={recipe?.id} />
            <Like recipeId={recipe?.id} initialLikesCount={recipe?.likeCount || 0} />
          </div>
        </div>

        <Card.Body className="p-4 p-md-5">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <div>
              {recipe?.category && <Badge bg="primary" className="me-2 px-3 py-2 fs-6 rounded-pill">{recipe.category}</Badge>}
              {recipe?.cuisine && <Badge bg="dark" className="px-3 py-2 fs-6 rounded-pill">{recipe.cuisine}</Badge>}
            </div>
            <RatingStars rating={recipe?.averageRating || recipe?.rating || 4.8} size="large" />
          </div>

          <h1 className="fw-bold mb-3 text-dark">{recipe?.title || recipe?.name}</h1>

          <PreparationDetails
            prepTime={recipe?.prepTime}
            cookTime={recipe?.cookTime}
            servings={recipe?.servings}
          />

          <RecipeDescription description={recipe?.description} />

          <RecipeIngredients ingredients={recipe?.ingredients} />

          <RecipeInstruction instructions={recipe?.instructions} />

          <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mt-4 pt-3 border-top">
            <div className="d-flex gap-2">
              <Link to="/" className="btn btn-outline-secondary rounded-pill px-4">
                ← Back
              </Link>
              <ImageDownloader imageUrl={imgSrc} title={recipe?.title} />
            </div>

            {currentUser ? (
              <div className="d-flex gap-2">
                <Link to={`/update/${recipeId}/update-recipe`} className="btn btn-warning rounded-pill px-4 fw-bold">
                  ✏️ Edit Recipe
                </Link>
                <Link to={`/update-image/${recipeId}/update-image`} className="btn btn-outline-primary rounded-pill px-3">
                  📷 Change Image
                </Link>
                <Button variant="danger" className="rounded-pill px-3" onClick={handleDelete} disabled={deleting}>
                  🗑️ Delete
                </Button>
              </div>
            ) : (
              <Link to="/login" state={{ from: location }} className="btn btn-outline-warning rounded-pill px-4 fw-bold">
                🔒 Log in to Edit / Modify Recipe
              </Link>
            )}
          </div>

          <Reviews recipeId={recipeId} initialReviews={recipe?.reviews || []} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecipeDetails;
