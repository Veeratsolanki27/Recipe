import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto border-top border-secondary">
      <Container>
        <Row className="gy-4">
          {/* Brand & Summary */}
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="fs-3">🍳</span>
              <span className="fs-4 fw-bold text-white">RecipeHub</span>
            </div>
            <p className="text-light opacity-75 small lh-base mb-3">
              Your daily source of culinary inspiration. Discover thousands of tested recipes,
              share your favorite meals, and cook with passion every day.
            </p>
            <div className="d-flex gap-2">
              <span className="badge bg-secondary-subtle text-secondary px-3 py-2 rounded-pill">
                ⭐ 85k+ Recipes
              </span>
              <span className="badge bg-secondary-subtle text-secondary px-3 py-2 rounded-pill">
                🌍 45+ Cuisines
              </span>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={3} sm={6}>
            <h6 className="fw-bold text-uppercase text-warning mb-3">Explore</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/" className="text-light text-decoration-none opacity-75 hover-opacity-100">
                  Home Feed
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="text-light text-decoration-none opacity-75 hover-opacity-100">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/add-recipe" className="text-light text-decoration-none opacity-75 hover-opacity-100">
                  Share Recipe
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-light text-decoration-none opacity-75 hover-opacity-100">
                  My Dashboard
                </Link>
              </li>
            </ul>
          </Col>

          {/* Popular Cuisines */}
          <Col lg={3} md={3} sm={6}>
            <h6 className="fw-bold text-uppercase text-warning mb-3">Top Cuisines</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/" className="text-light text-decoration-none opacity-75">
                  🇮🇹 Italian Pastas & Pizzas
                </Link>
              </li>
              <li>
                <Link to="/" className="text-light text-decoration-none opacity-75">
                  🇮🇳 Indian Curries & Biryanis
                </Link>
              </li>
              <li>
                <Link to="/" className="text-light text-decoration-none opacity-75">
                  🇲🇽 Mexican Tacos & Salsas
                </Link>
              </li>
              <li>
                <Link to="/" className="text-light text-decoration-none opacity-75">
                  🇫🇷 French Pastries & Desserts
                </Link>
              </li>
            </ul>
          </Col>

          {/* Community / Newsletter */}
          <Col lg={3} md={6}>
            <h6 className="fw-bold text-uppercase text-warning mb-3">Community</h6>
            <p className="text-light opacity-75 small mb-3">
              Join thousands of enthusiastic cooks! Bookmark recipes and track your culinary journey.
            </p>
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-sm btn-outline-light rounded-pill px-3">
                Sign In
              </Link>
              <Link to="/login" className="btn btn-sm btn-warning rounded-pill px-3 fw-semibold text-dark">
                Register Free
              </Link>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center small text-light opacity-75 gap-2">
          <span>&copy; {new Date().getFullYear()} RecipeHub Inc. All rights reserved.</span>
          <span>Crafted for foodies & home chefs everywhere.</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
