import React, { useEffect, useState } from "react";
import Hero from "../hero/Hero";
import RecipeCard from "../recipe/RecipeCard";
import { getAllRecipes, deleteRecipe } from "../service/RecipeService";
import { Row, Col, Container, Form, InputGroup, Button } from "react-bootstrap";
import CategoryFilter from "../common/CategoryFilter";
import CuisineFilter from "../common/CuisineFilter";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await getAllRecipes();
      setRecipes(response || []);
      setFilteredRecipes(response || []);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message || "Failed to load recipes.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(recipeId);
        setRecipes((prev) => prev.filter((r) => String(r.id) !== String(recipeId)));
        setFilteredRecipes((prev) => prev.filter((r) => String(r.id) !== String(recipeId)));
      } catch (err) {
        alert("Failed to delete recipe.");
      }
    }
  };

  useEffect(() => {
    let filtered = [...recipes];

    // Category filter
    if (activeCategory) {
      filtered = filtered.filter(
        (recipe) => recipe.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Cuisine filter
    if (selectedCuisines && selectedCuisines.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedCuisines.some(
          (cui) => cui.toLowerCase() === recipe.cuisine?.toLowerCase()
        )
      );
    }

    // Multi-term Search filter (matches title, description, category, cuisine, and ingredients)
    if (searchTerm && searchTerm.trim() !== "") {
      const tokens = searchTerm
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      filtered = filtered.filter((recipe) => {
        const title = (recipe.title || recipe.name || "").toLowerCase();
        const description = (recipe.description || "").toLowerCase();
        const category = (recipe.category || "").toLowerCase();
        const cuisine = (recipe.cuisine || "").toLowerCase();
        
        let ingredientText = "";
        if (Array.isArray(recipe.ingredients)) {
          ingredientText = recipe.ingredients
            .map((ing) => (typeof ing === "string" ? ing : ing.name || ""))
            .join(" ")
            .toLowerCase();
        } else if (typeof recipe.ingredients === "string") {
          ingredientText = recipe.ingredients.toLowerCase();
        }

        const combinedSearchableContent = `${title} ${description} ${category} ${cuisine} ${ingredientText}`;

        // Match every token typed by user
        return tokens.every((token) => combinedSearchableContent.includes(token));
      });
    }

    setFilteredRecipes(filtered);
  }, [activeCategory, selectedCuisines, searchTerm, recipes]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleCuisineFilter = (cuisines) => {
    setSelectedCuisines(cuisines);
  };

  const handleResetFilters = () => {
    setActiveCategory(null);
    setSelectedCuisines([]);
    setSearchTerm("");
  };

  return (
    <>
      <Hero />
      <main className="home-container py-4">
        <Container className="main-content" id="explore">
          <div className="text-center mb-4">
            <h2 className="display-6 fw-bold text-dark mb-2">
              Explore Recipes on RecipeHub
            </h2>
            <p className="text-muted fs-6">
              Search by title, ingredients, cuisine or browse by categories
            </p>
          </div>

          {/* Prominent, Responsive Search Bar */}
          <Row className="justify-content-center mb-4">
            <Col xs={12} md={9} lg={7}>
              <div className="p-1 bg-white rounded-pill shadow border d-flex align-items-center">
                <span className="ps-3 pe-2 text-muted fs-5">🔍</span>
                <Form.Control
                  type="text"
                  placeholder="Search recipes, ingredients (e.g. pasta, garlic, cheese)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 shadow-none py-2 fs-6 bg-transparent"
                  autoComplete="off"
                />
                {searchTerm && (
                  <Button
                    variant="link"
                    className="text-muted pe-3 text-decoration-none border-0"
                    onClick={() => setSearchTerm("")}
                    title="Clear search"
                  >
                    ✕
                  </Button>
                )}
                <Button
                  variant="primary"
                  className="rounded-pill px-4 py-2 fw-semibold shadow-sm text-nowrap"
                  onClick={() => {}}
                >
                  Search
                </Button>
              </div>
            </Col>
          </Row>

          {/* Category Filters */}
          <Row className="mb-3">
            <Col xs={12}>
              <CategoryFilter
                activeCategory={activeCategory}
                onCategoryClick={handleCategoryClick}
                onSelectCategory={handleCategoryClick}
              />
            </Col>
          </Row>

          {/* Cuisine Filters */}
          <Row className="mb-4">
            <Col xs={12}>
              <CuisineFilter
                selectedCuisines={selectedCuisines}
                onFilterChange={handleCuisineFilter}
                onSelectCuisine={handleCuisineFilter}
              />
            </Col>
          </Row>

          {/* Filter Status & Active Tag Pills */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 p-2 bg-light rounded-3 text-muted small">
            <div>
              <strong>Showing {filteredRecipes.length}</strong> {filteredRecipes.length === 1 ? "recipe" : "recipes"}
              {searchTerm && (
                <span className="ms-2 badge bg-primary-subtle text-primary border">
                  keyword: "{searchTerm}"
                </span>
              )}
              {activeCategory && (
                <span className="ms-2 badge bg-warning-subtle text-warning-emphasis border">
                  category: {activeCategory}
                </span>
              )}
              {selectedCuisines.length > 0 && (
                <span className="ms-2 badge bg-dark-subtle text-dark border">
                  cuisines: {selectedCuisines.join(", ")}
                </span>
              )}
            </div>

            {(activeCategory || selectedCuisines.length > 0 || searchTerm) && (
              <button
                className="btn btn-sm btn-link text-decoration-none p-0 text-danger fw-semibold"
                onClick={handleResetFilters}
              >
                Clear all filters ✕
              </button>
            )}
          </div>

          {isLoading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading recipes...</span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="alert alert-danger text-center my-4">{errorMessage}</div>
          )}

          {!isLoading && !errorMessage && (
            <Row className="g-4">
              {filteredRecipes && filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <Col key={recipe.id} md={6} lg={4} sm={12}>
                    <RecipeCard recipe={recipe} onDelete={handleDeleteRecipe} />
                  </Col>
                ))
              ) : (
                <Col xs={12} className="text-center py-5">
                  <div className="p-5 bg-light rounded-4 border">
                    <div className="fs-1 mb-3">🍲</div>
                    <h4 className="fw-bold text-secondary">No matching recipes found</h4>
                    <p className="text-muted">
                      No recipes matched "{searchTerm || activeCategory || selectedCuisines.join(", ")}". Try different keywords or reset your filters.
                    </p>
                    <button
                      className="btn btn-outline-primary rounded-pill px-4 fw-semibold"
                      onClick={handleResetFilters}
                    >
                      Reset All Filters
                    </button>
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Container>
      </main>
    </>
  );
};

export default Home;
