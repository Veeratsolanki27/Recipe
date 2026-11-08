import React from "react";

const RecipeInstruction = ({ instructions }) => {
  if (!instructions) return null;

  const steps = Array.isArray(instructions)
    ? instructions
    : String(instructions)
        .split("\n")
        .map((s) => s.replace(/^\d+\.\s*/, "").trim())
        .filter(Boolean);

  return (
    <div className="mb-4">
      <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
        <span>👨‍🍳</span> Step-by-Step Instructions
      </h5>
      <div className="d-flex flex-column gap-3">
        {steps.map((step, idx) => (
          <div key={idx} className="d-flex gap-3 p-3 rounded-3 bg-white border shadow-sm align-items-start">
            <div
              className="bg-primary text-white fw-bold rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: "32px", height: "32px", fontSize: "0.9rem" }}
            >
              {idx + 1}
            </div>
            <div className="text-secondary pt-1" style={{ lineHeight: "1.6" }}>
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeInstruction;
