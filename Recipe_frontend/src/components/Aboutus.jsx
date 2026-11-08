import React from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Aboutus = () => {
  const stats = [
    { label: "Community Chefs", value: "12,000+", icon: "👨‍🍳" },
    { label: "Tested Recipes", value: "85,000+", icon: "🍲" },
    { label: "Cuisines Covered", value: "45+", icon: "🌍" },
    { label: "Happy Foodies", value: "1.2M+", icon: "❤️" },
  ];

  const features = [
    {
      title: "Chef-Crafted Quality",
      desc: "Every recipe undergoes testing for precise measurements, step-by-step clarity, and foolproof cooking times.",
      icon: "⭐",
      color: "primary",
    },
    {
      title: "Cuisine Discovery",
      desc: "Explore authentic traditional recipes from Mediterranean pastas to aromatic South Asian curries and street food.",
      icon: "🌶️",
      color: "warning",
    },
    {
      title: "Interactive Cook Mode",
      desc: "Dynamic ingredient scaling, preparation timers, step tracking, and high-definition food photography.",
      icon: "⏱️",
      color: "success",
    },
    {
      title: "Community Bookmarks & Reviews",
      desc: "Save your favorite recipes, share reviews, and connect directly with fellow creators and home cooks.",
      icon: "🔖",
      color: "info",
    },
  ];

  const team = [
    {
      name: "Chef Marco Silva",
      role: "Head of Culinary & Pastry",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80",
      bio: "15+ years leading Michelin-recommended kitchens in Milan and Paris.",
    },
    {
      name: "Amina Al-Mansoor",
      role: "Global Flavors & Recipe Editor",
      avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop&q=80",
      bio: "Food anthropologist exploring authentic spices and heritage dishes worldwide.",
    },
    {
      name: "David Kim",
      role: "Lead Platform Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      bio: "Building performant, accessible digital cooking experiences for foodies everywhere.",
    },
  ];

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <div className="bg-dark text-white py-5 position-relative overflow-hidden" style={{ minHeight: "380px" }}>
        <div
          className="position-absolute w-100 h-100 top-0 start-0 opacity-25"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Container className="position-relative py-5 text-center">
          <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill fs-6 mb-3 fw-bold shadow-sm">
            🍳 Passionate About Real Food
          </Badge>
          <h1 className="display-4 fw-extrabold text-white mb-3">
            Cooking Made Joyful, Simple & Inspiring
          </h1>
          <p className="lead text-light mx-auto mb-4" style={{ maxWidth: "720px", fontSize: "1.25rem" }}>
            RecipeHub is a worldwide community where home cooks, passionate amateurs, and certified chefs unite to share authentic flavors, cooking tricks, and heritage meals.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/" className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow">
              Explore Recipes
            </Link>
            <Link to="/add-recipe" className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold">
              Share a Recipe
            </Link>
          </div>
        </Container>
      </div>

      {/* Stats Counter Section */}
      <Container className="py-5" style={{ marginTop: "-40px" }}>
        <Row className="g-4">
          {stats.map((s, idx) => (
            <Col key={idx} xs={6} md={3}>
              <Card className="text-center border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                <Card.Body className="p-2">
                  <div className="fs-1 mb-1">{s.icon}</div>
                  <h3 className="fw-bold text-dark mb-0">{s.value}</h3>
                  <small className="text-muted fw-semibold">{s.label}</small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Mission / Value Pillars */}
      <Container className="py-5">
        <div className="text-center mb-5">
          <Badge bg="secondary" className="px-3 py-2 rounded-pill text-uppercase mb-2">Our Mission</Badge>
          <h2 className="fw-bold display-6">Why Chefs & Foodies Choose RecipeHub</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            We empower food lovers of every skill level to cook with confidence and discover world-class dishes.
          </p>
        </div>

        <Row className="g-4">
          {features.map((f, i) => (
            <Col key={i} md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm rounded-4 p-3 transition-hover">
                <Card.Body>
                  <div
                    className={`d-inline-flex p-3 rounded-4 bg-${f.color}-subtle text-${f.color} fs-3 mb-3`}
                  >
                    {f.icon}
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{f.title}</h5>
                  <p className="text-muted small mb-0 lh-base">{f.desc}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Team / Culinary Curators */}
      <div className="bg-light py-5">
        <Container className="py-4">
          <div className="text-center mb-5">
            <Badge bg="dark" className="px-3 py-2 rounded-pill text-uppercase mb-2">The Culinary Team</Badge>
            <h2 className="fw-bold display-6">Meet the Curators Behind RecipeHub</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
              Our expert chefs and developers curate, verify, and highlight the finest kitchen recipes.
            </p>
          </div>

          <Row className="g-4 justify-content-center">
            {team.map((member, idx) => (
              <Col key={idx} md={4} sm={6}>
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden text-center h-100">
                  <div style={{ height: "260px", overflow: "hidden" }}>
                    <Card.Img
                      variant="top"
                      src={member.avatar}
                      alt={member.name}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </div>
                  <Card.Body className="p-4">
                    <h5 className="fw-bold mb-1 text-dark">{member.name}</h5>
                    <p className="text-primary small fw-semibold mb-2">{member.role}</p>
                    <p className="text-muted small mb-0">{member.bio}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Call to Action */}
      <Container className="py-5 my-3 text-center">
        <Card className="border-0 bg-primary text-white p-5 rounded-4 shadow-lg position-relative overflow-hidden">
          <div className="position-relative z-1">
            <h2 className="display-6 fw-bold mb-3">Have a Family Favorite or Secret Recipe?</h2>
            <p className="lead mb-4 mx-auto opacity-90" style={{ maxWidth: "650px" }}>
              Join thousands of enthusiastic cooks! Publish your recipe with step-by-step guides, photos, and personalized prep details in minutes.
            </p>
            <Link to="/add-recipe" className="btn btn-warning btn-lg rounded-pill px-5 fw-bold text-dark shadow">
              🚀 Publish Your Recipe Now
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Aboutus;
