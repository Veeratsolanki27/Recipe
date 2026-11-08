import React from "react";

const RatingStars = ({ rating = 4.5, size = "normal" }) => {
  const numStars = Math.min(5, Math.max(0, Math.round(rating)));
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        style={{
          color: i <= numStars ? "#ffc107" : "#e4e5e9",
          fontSize: size === "small" ? "0.9rem" : size === "large" ? "1.4rem" : "1.1rem",
        }}
      >
        ★
      </span>
    );
  }

  return (
    <div className="d-inline-flex align-items-center gap-1">
      <div>{stars}</div>
      <small className="text-muted fw-bold ms-1" style={{ fontSize: size === "small" ? "0.75rem" : "0.85rem" }}>
        ({rating})
      </small>
    </div>
  );
};

export default RatingStars;
