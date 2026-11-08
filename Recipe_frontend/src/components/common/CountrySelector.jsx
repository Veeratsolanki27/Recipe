import React from "react";
import { Form } from "react-bootstrap";

const cuisines = [
  "Italian",
  "Indian",
  "American",
  "Mexican",
  "Chinese",
  "French",
  "Greek",
  "Japanese",
  "Thai",
  "Spanish"
];

const CountrySelector = ({ value, onChange, name = "cuisine" }) => {
  return (
    <Form.Select name={name} value={value} onChange={onChange}>
      <option value="">Select Cuisine...</option>
      {cuisines.map((cui) => (
        <option key={cui} value={cui}>
          {cui}
        </option>
      ))}
    </Form.Select>
  );
};

export default CountrySelector;
