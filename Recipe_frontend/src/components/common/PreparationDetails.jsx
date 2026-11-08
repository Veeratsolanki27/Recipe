import React from "react";
import { Badge } from "react-bootstrap";

const PreparationDetails = ({ prepTime, cookTime, servings }) => {
  return (
    <div className="d-flex flex-wrap gap-3 my-3 p-3 bg-light rounded-3 border align-items-center">
      {prepTime && (
        <div className="d-flex align-items-center gap-2">
          <span className="fs-5">⏱️</span>
          <div>
            <div className="text-muted small fw-bold text-uppercase">Prep Time</div>
            <div className="fw-semibold">{prepTime}</div>
          </div>
        </div>
      )}

      {cookTime && (
        <div className="d-flex align-items-center gap-2 border-start ps-3">
          <span className="fs-5">🍳</span>
          <div>
            <div className="text-muted small fw-bold text-uppercase">Cook Time</div>
            <div className="fw-semibold">{cookTime}</div>
          </div>
        </div>
      )}

      {servings && (
        <div className="d-flex align-items-center gap-2 border-start ps-3">
          <span className="fs-5">🍽️</span>
          <div>
            <div className="text-muted small fw-bold text-uppercase">Servings</div>
            <div className="fw-semibold">{servings} people</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreparationDetails;
