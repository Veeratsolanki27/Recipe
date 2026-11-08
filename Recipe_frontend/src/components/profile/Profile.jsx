import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Nav, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getBookmarksApi, getMyRecipesApi, getCurrentUser, deleteRecipe } from "../service/RecipeService";
import RecipeCard from "../recipe/RecipeCard";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("my-recipes");
  const [myRecipes, setMyRecipes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = getCurrentUser();
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [recipesData, bookmarksData] = await Promise.all([
          getMyRecipesApi().catch(() => []),
          getBookmarksApi().catch(() => []),
        ]);
        setMyRecipes(recipesData || []);
        setBookmarks(bookmarksData || []);
      } catch (err) {
        setError("Failed to load your profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, navigate]);

  const handleDeleteRecipe = async (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(recipeId);
        setMyRecipes(myRecipes.filter((r) => r.id !== recipeId));
      } catch (err) {
        alert("Failed to delete recipe.");
      }
    }
  };

  return (
    <Container className="py-5">
      {/* Profile Header */}
      <Card className="border-0 shadow-sm rounded-4 mb-4 bg-light">
        <Card.Body className="p-4 p-md-5 d-flex flex-column flex-md-row align-items-center gap-4">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow"
            style={{ width: "90px", height: "90px", fontSize: "2.5rem" }}
          >
            {username ? username.charAt(0).toUpperCase() : "👤"}
          </div>

          <div className="flex-grow-1 text-center text-md-start">
            <h2 className="fw-bold mb-1">{currentUser?.fullName || username}</h2>
            <p className="text-muted mb-2">@{username} • {currentUser?.email || "Community Member"}</p>
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
              <Badge bg="secondary" className="px-3 py-2 rounded-pill">
                🍳 {myRecipes.length} Created Recipes
              </Badge>
              <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill">
                ⭐ {bookmarks.length} Bookmarks
              </Badge>
            </div>
          </div>

          <div>
            <Link to="/add-recipe" className="btn btn-primary rounded-pill px-4 py-2 shadow-sm fw-semibold">
              ➕ New Recipe
            </Link>
          </div>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Tabs */}
      <Nav variant="pills" className="mb-4 gap-2">
        <Nav.Item>
          <Nav.Link
            active={activeTab === "my-recipes"}
            onClick={() => setActiveTab("my-recipes")}
            className="rounded-pill px-4 fw-semibold cursor-pointer"
          >
            My Recipes ({myRecipes.length})
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === "bookmarks"}
            onClick={() => setActiveTab("bookmarks")}
            className="rounded-pill px-4 fw-semibold cursor-pointer"
          >
            Saved Bookmarks ({bookmarks.length})
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Content */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Loading your collection...</p>
        </div>
      ) : activeTab === "my-recipes" ? (
        myRecipes.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {myRecipes.map((recipe) => (
              <Col key={recipe.id}>
                <div className="position-relative h-100">
                  <RecipeCard recipe={recipe} />
                  <div className="mt-2 d-flex gap-2">
                    <Link
                      to={`/update/${recipe.id}/update-recipe`}
                      className="btn btn-sm btn-outline-primary flex-grow-1 rounded-pill"
                    >
                      ✏️ Edit
                    </Link>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="flex-grow-1 rounded-pill"
                      onClick={() => handleDeleteRecipe(recipe.id)}
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <Card className="text-center p-5 border-0 shadow-sm rounded-4">
            <h4 className="fw-semibold text-muted mb-3">You haven't posted any recipes yet.</h4>
            <p className="text-muted">Share your culinary creations with foodies around the world!</p>
            <div className="mt-3">
              <Link to="/add-recipe" className="btn btn-primary rounded-pill px-4">
                Share a Recipe
              </Link>
            </div>
          </Card>
        )
      ) : (
        bookmarks.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {bookmarks.map((recipe) => (
              <Col key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </Col>
            ))}
          </Row>
        ) : (
          <Card className="text-center p-5 border-0 shadow-sm rounded-4">
            <h4 className="fw-semibold text-muted mb-3">No saved recipes yet.</h4>
            <p className="text-muted">Browse the home feed and click the bookmark icon on any recipe to save it here!</p>
            <div className="mt-3">
              <Link to="/" className="btn btn-outline-primary rounded-pill px-4">
                Explore Recipes
              </Link>
            </div>
          </Card>
        )
      )}
    </Container>
  );
};

export default Profile;

