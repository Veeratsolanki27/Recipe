import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutUser, getCurrentUser, getBookmarksApi } from "../service/RecipeService";
import { Badge } from "react-bootstrap";

const Header = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentName = localStorage.getItem("username") || "";
    setUsername(currentName);
    setUser(getCurrentUser());

    if (currentName) {
      getBookmarksApi()
        .then((b) => setBookmarkCount(Array.isArray(b) ? b.length : 0))
        .catch(() => setBookmarkCount(0));
    } else {
      setBookmarkCount(0);
    }
  }, [location]);

  const handleLogout = () => {
    logoutUser();
    setUsername("");
    setUser(null);
    setBookmarkCount(0);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow py-3 sticky-top border-bottom border-dark-subtle">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-extrabold fs-4 d-flex align-items-center gap-2 text-decoration-none" to="/">
          <span className="p-1 bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
            🍳
          </span>
          <span className="fw-bold tracking-tight text-white">Recipe<span className="text-warning">Hub</span></span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Main Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <Link className={`nav-link px-3 ${location.pathname === "/" ? "active text-warning fw-semibold" : ""}`} to="/">
                Explore Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 ${location.pathname === "/aboutus" ? "active text-warning fw-semibold" : ""}`}
                to="/aboutus"
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link px-3 fw-bold text-warning d-flex align-items-center gap-1"
                to={username ? "/add-recipe" : "/login"}
                state={!username ? { from: { pathname: "/add-recipe" } } : undefined}
              >
                <span>➕</span>
                <span>Share Recipe</span>
              </Link>
            </li>
          </ul>

          {/* User Auth Section */}
          <ul className="navbar-nav align-items-center gap-2">
            {username ? (
              <>
                {/* Bookmarks link */}
                <li className="nav-item">
                  <Link
                    to="/profile"
                    className="btn btn-sm btn-outline-warning rounded-pill px-3 py-1 d-flex align-items-center gap-1 text-decoration-none"
                    title="View Saved Bookmarks"
                  >
                    <span>⭐</span>
                    <span>Bookmarks</span>
                    {bookmarkCount > 0 && (
                      <Badge bg="warning" text="dark" className="ms-1 rounded-pill">
                        {bookmarkCount}
                      </Badge>
                    )}
                  </Link>
                </li>

                {/* Profile Pill */}
                <li className="nav-item">
                  <Link
                    to="/profile"
                    className="btn btn-sm btn-primary rounded-pill px-3 py-1 d-flex align-items-center gap-2 fw-semibold shadow-sm text-decoration-none"
                  >
                    <span>👤</span>
                    <span>{user?.fullName || username}</span>
                  </Link>
                </li>

                {/* Sign Out Button */}
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1"
                    onClick={handleLogout}
                    title="Sign Out"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item d-flex gap-2">
                <Link className="btn btn-sm btn-outline-light rounded-pill px-3 py-1 fw-semibold" to="/login">
                  Sign In
                </Link>
                <Link className="btn btn-sm btn-warning rounded-pill px-3 py-1 fw-bold text-dark shadow-sm" to="/login">
                  Get Started
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
