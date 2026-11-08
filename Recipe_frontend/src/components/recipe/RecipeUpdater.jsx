import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../service/RecipeService";
import { Container, Form, Button, Alert, Card, Spinner } from "react-bootstrap";
import CategorySelector from "../common/CategorySelector";
import CountrySelector from "../common/CountrySelector";
import ImageUploader from "../image/ImageUploader";

const RecipeUpdater = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    cuisine: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setFormData({
          title: data.title || data.name || "",
          description: data.description || "",
          category: data.category || "",
          cuisine: data.cuisine || "",
          prepTime: data.prepTime || "",
          cookTime: data.cookTime || "",
          servings: data.servings || "",
          ingredients: Array.isArray(data.ingredients) ? data.ingredients.join("\n") : data.ingredients || "",
          instructions: Array.isArray(data.instructions) ? data.instructions.join("\n") : data.instructions || "",
          imageUrl: data.imageUrl || data.image || data.photoUrl || data.photo || data.imagePath || "",
        });
      } catch (err) {
        setError(err.message || "Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    };
    if (recipeId) fetchRecipe();
  }, [recipeId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateRecipe(recipeId, formData, imageFile);
      navigate(`/recipe/${recipeId}/recipe-details`);
    } catch (err) {
      setError(err.message || "Failed to update recipe.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="my-5" style={{ maxWidth: "700px" }}>
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Header className="bg-warning text-dark p-4">
          <h3 className="mb-0 fw-bold">✏️ Update Recipe</h3>
        </Card.Header>
        <Card.Body className="p-4 p-md-5">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Recipe Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <Form.Label className="fw-bold">Category</Form.Label>
                <CategorySelector value={formData.category} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-bold">Cuisine</Form.Label>
                <CountrySelector value={formData.cuisine} onChange={handleChange} />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <Form.Label className="fw-bold">Prep Time</Form.Label>
                <Form.Control
                  type="text"
                  name="prepTime"
                  placeholder="e.g. 15 mins"
                  value={formData.prepTime}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <Form.Label className="fw-bold">Cook Time</Form.Label>
                <Form.Control
                  type="text"
                  name="cookTime"
                  placeholder="e.g. 30 mins"
                  value={formData.cookTime}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <Form.Label className="fw-bold">Servings</Form.Label>
                <Form.Control
                  type="number"
                  name="servings"
                  placeholder="e.g. 4"
                  value={formData.servings}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Ingredients (one per line)</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Preparation Steps / Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
              />
            </Form.Group>

            <ImageUploader
              currentImageUrl={formData.imageUrl}
              onImageSelected={(url, file) => {
                setFormData({ ...formData, imageUrl: url });
                setImageFile(file);
              }}
            />

            <div className="d-flex gap-2 justify-content-end mt-4">
              <Link to={`/recipe/${recipeId}/recipe-details`} className="btn btn-outline-secondary rounded-pill px-4">
                Cancel
              </Link>
              <Button variant="warning" type="submit" className="rounded-pill px-4 fw-bold" disabled={saving}>
                {saving ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecipeUpdater;
