import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Tab, Tabs } from "react-bootstrap";
import { loginApi, registerApi } from "../service/RecipeService";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    if (!loginForm.username.trim()) {
      setErrorMessage("Please enter a username.");
      setLoading(false);
      return;
    }

    try {
      await loginApi(loginForm);
      setSuccessMessage("Logged in successfully!");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    } catch (error) {
      const msg = error.response?.data?.message || "Invalid credentials or login failed. Please try again.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!registerForm.username.trim()) {
      setErrorMessage("Please choose a valid username.");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (registerForm.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await registerApi({
        username: registerForm.username.trim(),
        email: registerForm.email.trim(),
        fullName: registerForm.fullName.trim(),
        password: registerForm.password,
      });
      setSuccessMessage("Account created successfully! Welcome to RecipeHub.");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 800);
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed. Username may already exist.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "520px" }}>
      <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
        <div className="bg-primary text-white p-4 text-center position-relative">
          <div className="fs-1 mb-1">🍳</div>
          <h3 className="fw-bold mb-1">RecipeHub</h3>
          <p className="mb-0 opacity-75 small">Sign in to save, review, and publish delicious recipes</p>
        </div>

        <Card.Body className="p-4 p-md-5">
          {errorMessage && (
            <Alert variant="danger" dismissible onClose={() => setErrorMessage(null)}>
              {errorMessage}
            </Alert>
          )}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Tabs
            id="auth-tabs"
            activeKey={activeTab}
            onSelect={(k) => {
              setActiveTab(k);
              setErrorMessage(null);
            }}
            className="mb-4 nav-justified"
          >
            {/* LOGIN TAB */}
            <Tab eventKey="login" title="Sign In">
              <Form onSubmit={handleLoginSubmit} className="mt-3">
                <Form.Group className="mb-3" controlId="loginUsername">
                  <Form.Label className="fw-semibold small text-secondary">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={loginForm.username}
                    onChange={handleLoginChange}
                    required
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="loginPassword">
                  <Form.Label className="fw-semibold small text-secondary">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                    className="py-2"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 py-2 fw-bold rounded-pill shadow-sm"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Form>
            </Tab>

            {/* REGISTER TAB */}
            <Tab eventKey="register" title="Create Account">
              <Form onSubmit={handleRegisterSubmit} className="mt-3">
                <Form.Group className="mb-3" controlId="regUsername">
                  <Form.Label className="fw-semibold small text-secondary">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="e.g. master_chef"
                    value={registerForm.username}
                    onChange={handleRegisterChange}
                    required
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="regFullName">
                  <Form.Label className="fw-semibold small text-secondary">Full Name (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Alex Morgan"
                    value={registerForm.fullName}
                    onChange={handleRegisterChange}
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="regEmail">
                  <Form.Label className="fw-semibold small text-secondary">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="alex@example.com"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    required
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="regPassword">
                  <Form.Label className="fw-semibold small text-secondary">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="At least 6 characters"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="regConfirmPassword">
                  <Form.Label className="fw-semibold small text-secondary">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                    className="py-2"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="success"
                  className="w-100 py-2 fw-bold rounded-pill shadow-sm"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
