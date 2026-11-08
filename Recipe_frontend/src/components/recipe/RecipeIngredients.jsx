import React, { useState } from "react";
import { Form } from "react-bootstrap";

const RecipeIngredients = ({ ingredients }) => {
  const [checkedState, setCheckedState] = useState({});

  if (!ingredients) return null;

  const ingredientList = Array.isArray(ingredients)
    ? ingredients
    : String(ingredients)
        .split("\n")
        .map((i) => i.replace(/^[•\-\d\.]+\s*/, "").trim())
        .filter(Boolean);

  const toggleCheck = (idx) => {
    setCheckedState((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="mb-4 p-4 bg-light rounded-3 border">
      <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
        <span>🥗</span> Ingredients ({ingredientList.length})
      </h5>
      <div className="d-flex flex-column gap-2">
        {ingredientList.map((item, idx) => (
          <Form.Check
            key={idx}
            type="checkbox"
            id={`ing-${idx}`}
            label={item}
            checked={!!checkedState[idx]}
            onChange={() => toggleCheck(idx)}
            className={`fs-6 ${checkedState[idx] ? "text-decoration-line-through text-muted" : "text-dark"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeIngredients;
