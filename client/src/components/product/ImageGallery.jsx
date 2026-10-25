import { useState } from 'react';

export const ImageGallery = ({
  images = [],
  title = 'Product',
}) => {
  const fallbackImage =
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';

  const galleryImages = images && images.length > 0 ? images : [fallbackImage];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="image-gallery-container">
      {/* Main active image */}
      <div className="main-image-viewport">
        <img
          src={galleryImages[selectedIndex] || fallbackImage}
          alt={`${title} - view ${selectedIndex + 1}`}
          className="main-display-image"
        />
      </div>

      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="thumbnail-track">
          {galleryImages.map((imgUrl, index) => (
            <button
              key={`${imgUrl}-${index}`}
              type="button"
              className={`thumbnail-btn ${selectedIndex === index ? 'active-thumb' : ''}`}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={imgUrl}
                alt={`${title} thumbnail ${index + 1}`}
                className="thumb-image"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
