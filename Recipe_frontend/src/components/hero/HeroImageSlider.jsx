import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Discover Culinary Masterpieces",
    description: "Explore thousand of mouthwatering recipes crafted by home chefs and food enthusiasts worldwide.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Explore Recipes",
    buttonLink: "#explore"
  },
  {
    id: 2,
    title: "Share Your Secret Recipes",
    description: "Pass down your favorite family dishes and inspire millions of passion-driven home cooks.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Add a Recipe",
    buttonLink: "/add-recipe"
  },
  {
    id: 3,
    title: "Fresh & Healthy Ideas Everyday",
    description: "Find nutritious meals, quick weeknight dinners, and delicious weekend treats.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&auto=format&fit=crop&q=80",
    buttonText: "View Categories",
    buttonLink: "#explore"
  }
];

const HeroImageSlider = () => {
  return (
    <div className="hero-slider-container mb-5 rounded-4 overflow-hidden shadow-lg">
      <Carousel fade interval={4000} pause="hover" indicators>
        {slides.map((slide) => (
          <Carousel.Item key={slide.id} style={{ height: "420px" }}>
            <div
              className="w-100 h-100 position-relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center text-white px-4">
                <h1 className="display-4 fw-bold mb-3">{slide.title}</h1>
                <p className="lead mb-4 max-w-600" style={{ maxWidth: "650px" }}>
                  {slide.description}
                </p>
                {slide.buttonLink.startsWith("/") ? (
                  <Link to={slide.buttonLink} className="btn btn-warning btn-lg rounded-pill fw-bold px-4 shadow">
                    {slide.buttonText}
                  </Link>
                ) : (
                  <a href={slide.buttonLink} className="btn btn-primary btn-lg rounded-pill fw-bold px-4 shadow">
                    {slide.buttonText}
                  </a>
                )}
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroImageSlider;
