import React, { useState, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { getRecipeImage, handleImageError } from "../../utils/imageHelper";

const ImageUploader = ({ currentImageUrl, onImageSelected }) => {
  const [preview, setPreview] = useState(currentImageUrl || "");
  const [urlInput, setUrlInput] = useState(currentImageUrl || "");

  useEffect(() => {
    if (currentImageUrl) {
      setPreview(currentImageUrl);
      setUrlInput(currentImageUrl.startsWith("data:image") ? "" : currentImageUrl);
    }
  }, [currentImageUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        if (onImageSelected) onImageSelected(reader.result, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setUrlInput(url);
    setPreview(url);
    if (onImageSelected) onImageSelected(url, null);
  };

  return (
    <div className="p-3 bg-light rounded-3 border mb-3">
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Recipe Image URL or Upload</Form.Label>
        <Form.Control
          type="url"
          placeholder="https://images.unsplash.com/photo-..."
          value={urlInput}
          onChange={handleUrlChange}
          className="mb-2"
        />
        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
      </Form.Group>

      {preview && (
        <div className="text-center mt-3 p-2 bg-white rounded border">
          <div className="text-muted small mb-1">Image Preview:</div>
          <Image
            src={preview}
            onError={(e) => handleImageError(e, 0)}
            alt="Preview"
            style={{ maxHeight: "200px", objectFit: "cover" }}
            rounded
            fluid
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
