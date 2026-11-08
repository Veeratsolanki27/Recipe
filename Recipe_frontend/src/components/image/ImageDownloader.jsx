import React from "react";
import { Button } from "react-bootstrap";

const ImageDownloader = ({ imageUrl, title = "recipe-image" }) => {
  const downloadImage = async () => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <Button variant="outline-dark" size="sm" onClick={downloadImage} className="fw-bold">
      📥 Download Photo
    </Button>
  );
};

export default ImageDownloader;
