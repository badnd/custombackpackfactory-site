'use client';

import { useState } from 'react';
import { assetPath } from '@/lib/paths';

export function ProductGallery({ product }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const images = product.gallery.map((image) => assetPath(image));

  return (
    <>
      <div>
        <button className="gallery-main" type="button" onClick={() => setLightbox(active)} aria-label="Open large product image">
          <img src={images[active]} alt={product.title} className="detail-main-image" />
          <span className="gallery-zoom-hint">Click to enlarge</span>
        </button>
        <div className="gallery-thumbs">
          {images.map((image, index) => (
            <button className="thumb-button" type="button" onClick={() => setActive(index)} key={image} aria-label={`View product image ${index + 1}`}>
              <img className={index === active ? 'active' : ''} src={image} alt={`${product.title} ${index + 1}`} />
            </button>
          ))}
        </div>
      </div>
      {lightbox !== null ? (
        <div className="image-lightbox open" role="dialog" aria-modal="true" aria-label={`${product.title} image gallery`} onClick={() => setLightbox(null)}>
          <button className="lightbox-close" type="button" aria-label="Close image viewer" onClick={() => setLightbox(null)}>&times;</button>
          <button className="lightbox-arrow lightbox-prev" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length); }}>&lt;</button>
          <div className="lightbox-stage" onClick={(event) => event.stopPropagation()}>
            <img src={images[lightbox]} alt={`${product.title} ${lightbox + 1}`} />
            <div className="lightbox-counter">{lightbox + 1} / {images.length}</div>
          </div>
          <button className="lightbox-arrow lightbox-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % images.length); }}>&gt;</button>
        </div>
      ) : null}
    </>
  );
}
