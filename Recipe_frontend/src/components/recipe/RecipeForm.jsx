import React, { useState } from "react";
import { createRecipe } from "../service/RecipeService";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import CategorySelector from "../common/CategorySelector";
import CountrySelector from "../common/CountrySelector";
import ImageUploader from "../image/ImageUploader";

const RecipeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    cuisine: "",
    prepTime: "15 mins",
    cookTime: "20 mins",
    servings: "4",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const location = useLocation();
  const loggedInUser = location.state?.username || localStorage.getItem("username") || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const created = await createRecipe(
        {
          ...formData,
          username: loggedInUser || "Guest",
        },
        imageFile
      );
      navigate(`/recipe/${created.id}/recipe-details`);
    } catch (err) {
      setError(err.message || "Failed to save recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: "700px" }}>
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Header className="bg-primary text-white p-4">
          <h3 className="mb-0 fw-bold">➕ Create New Recipe</h3>
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
                placeholder="e.g. Creamy Tuscan Garlic Chicken"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Short Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly describe what makes this recipe special..."
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
                  placeholder="15 mins"
                  value={formData.prepTime}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <Form.Label className="fw-bold">Cook Time</Form.Label>
                <Form.Control
                  type="text"
                  name="cookTime"
                  placeholder="25 mins"
                  value={formData.cookTime}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <Form.Label className="fw-bold">Servings</Form.Label>
                <Form.Control
                  type="number"
                  name="servings"
                  placeholder="4"
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
                placeholder="500g Chicken breast&#10;1 cup Heavy cream&#10;2 tbsp Olive oil"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Instructions / Preparation Steps</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="1. Heat oil in a large skillet over medium-high heat.&#10;2. Add chicken breasts and cook for 5 minutes per side until golden.&#10;3. Add garlic and heavy cream..."
                required
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
              <Link to="/" className="btn btn-outline-secondary rounded-pill px-4">
                Cancel
              </Link>
              <Button variant="primary" type="submit" className="rounded-pill px-4 fw-bold" disabled={loading}>
                {loading ? "Saving..." : "Save Recipe"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecipeForm;
