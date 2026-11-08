import React from "react";
import { Form } from "react-bootstrap";

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Beverages"];

const CategorySelector = ({ value, onChange, name = "category" }) => {
  return (
    <Form.Select name={name} value={value} onChange={onChange}>
      <option value="">Select Category...</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </Form.Select>
  );
};

export default CategorySelector;
