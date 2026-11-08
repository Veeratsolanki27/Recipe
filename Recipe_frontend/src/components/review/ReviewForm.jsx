import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ReviewForm = ({ onAddReview }) => {
  const storedUser = localStorage.getItem("username") || "";
  const [userName, setUserName] = useState(storedUser);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onAddReview({
      id: Date.now(),
      userName: userName.trim() || "Foodie Guest",
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date().toLocaleDateString()
    });
    setUserName(storedUser);
    setComment("");
    setRating(5);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 bg-white border rounded-3 mb-4 shadow-sm">
      <h6 className="fw-bold mb-3">Leave a Review</h6>
      <div className="row g-2 mb-3">
        <div className="col-md-8">
          <Form.Control
            type="text"
            placeholder="Your Name (Optional)"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            size="sm"
          />
        </div>
        <div className="col-md-4">
          <Form.Select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            size="sm"
          >
            <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
            <option value="4">⭐⭐⭐⭐ (4/5)</option>
            <option value="3">⭐⭐⭐ (3/5)</option>
            <option value="2">⭐⭐ (2/5)</option>
            <option value="1">⭐ (1/5)</option>
          </Form.Select>
        </div>
      </div>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Share your thoughts about this recipe..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          size="sm"
        />
      </Form.Group>
      <Button type="submit" variant="primary" size="sm" className="fw-bold px-3">
        Submit Review
      </Button>
    </Form>
  );
};

export default ReviewForm;
