import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../service/RecipeService";
import { Container, Card, Button, Alert, Spinner } from "react-bootstrap";
import ImageUploader from "./ImageUploader";

const ImageUpdater = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data);
        setNewImageUrl(data.imageUrl || data.image || data.photoUrl || data.photo || data.imagePath || "");
      } catch (err) {
        setError(err.message || "Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    };
    if (recipeId) fetchRecipe();
  }, [recipeId]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateRecipe(
        recipeId,
        {
          ...recipe,
          imageUrl: newImageUrl,
          image: newImageUrl,
          photoUrl: newImageUrl,
          photo: newImageUrl,
          imagePath: newImageUrl,
        },
        imageFile
      );
      navigate(`/recipe/${recipeId}/recipe-details`);
    } catch (err) {
      setError(err.message || "Failed to update recipe image.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Update Image for {recipe?.title}</h4>
        </Card.Header>
        <Card.Body className="p-4">
          {error && <Alert variant="danger">{error}</Alert>}
          <ImageUploader
            currentImageUrl={newImageUrl}
            onImageSelected={(url, file) => {
              setNewImageUrl(url);
              setImageFile(file);
            }}
          />
          <div className="d-flex gap-2 justify-content-end mt-4">
            <Link to={`/recipe/${recipeId}/recipe-details`} className="btn btn-outline-secondary">
              Cancel
            </Link>
            <Button variant="primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save New Image"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ImageUpdater;
