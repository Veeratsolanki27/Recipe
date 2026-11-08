import React from "react";

const RecipeDescription = ({ description }) => {
  if (!description) return null;
  return (
    <div className="mb-4">
      <h5 className="fw-bold text-dark mb-2">Description</h5>
      <p className="lead text-secondary fs-6">{description}</p>
    </div>
  );
};

export default RecipeDescription;
