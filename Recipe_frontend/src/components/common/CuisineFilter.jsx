import React from "react";
import { Badge, Button } from "react-bootstrap";

const cuisinesList = ["All", "Italian", "Indian", "American", "Mexican", "French", "Greek"];

const CuisineFilter = ({ selectedCuisines = [], onFilterChange }) => {
  const toggleCuisine = (cui) => {
    if (cui === "All") {
      onFilterChange([]);
      return;
    }
    if (selectedCuisines.includes(cui)) {
      onFilterChange(selectedCuisines.filter((c) => c !== cui));
    } else {
      onFilterChange([...selectedCuisines, cui]);
    }
  };

  return (
    <div className="mb-4 text-center">
      <div className="text-muted small mb-2 fw-bold text-uppercase">Filter By Cuisine</div>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {cuisinesList.map((cui) => {
          const isSelected = cui === "All" ? selectedCuisines.length === 0 : selectedCuisines.includes(cui);
          return (
            <Button
              key={cui}
              variant={isSelected ? "dark" : "outline-secondary"}
              size="sm"
              className="rounded-pill px-3 py-1 fw-medium"
              onClick={() => toggleCuisine(cui)}
            >
              {cui}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CuisineFilter;
