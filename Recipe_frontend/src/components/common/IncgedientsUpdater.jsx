import React from "react";
import { Form } from "react-bootstrap";

const IncgedientsUpdater = ({ ingredients, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">Ingredients List</Form.Label>
      <Form.Control
        as="textarea"
        rows={4}
        value={ingredients}
        onChange={onChange}
        placeholder="Enter each ingredient on a new line..."
      />
    </Form.Group>
  );
};

export default IncgedientsUpdater;
