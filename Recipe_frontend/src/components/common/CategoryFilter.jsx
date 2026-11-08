import React from "react";
import { Button } from "react-bootstrap";

const CategoryFilter = ({ onCategoryClick, activeCategory }) => {
  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

  return (
    <div className="mb-4 d-flex justify-content-center flex-wrap gap-2">
      {categories.map((cat) => {
        const isSelected = cat === "All" ? activeCategory === null : activeCategory === cat;
        return (
          <Button
            key={cat}
            variant={isSelected ? "primary" : "outline-primary"}
            className="rounded-pill px-4 py-2 fw-bold shadow-sm"
            onClick={() => onCategoryClick(cat === "All" ? null : cat)}
          >
            {cat}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
