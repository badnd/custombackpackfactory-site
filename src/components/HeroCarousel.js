'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { assetPath } from '@/lib/paths';

function normalizeSlideHref(href) {
  const map = {
    'pages/products.html': '/products',
    'pages/custom-service.html': '/custom-service',
    'pages/factory.html': '/factory',
    'pages/contact.html': '/contact'
  };
  return map[href] || href || '/products';
}

export function HeroCarousel({ slides }) {
  const validSlides = useMemo(() => slides.filter(Boolean), [slides]);
  const [active, setActive] = useState(0);
  const current = validSlides[active] || validSlides[0];

  useEffect(() => {
    if (validSlides.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % validSlides.length);
    }, current?.duration || 3500);
    return () => window.clearInterval(timer);
  }, [current?.duration, validSlides.length]);

  if (!current) return null;

  const goTo = (nextIndex) => {
    setActive((nextIndex + validSlides.length) % validSlides.length);
  };

  const primaryHref = normalizeSlideHref(current.link);
  const secondaryHref = primaryHref === '/custom-service' ? '/products' : '/custom-service';
  const secondaryLabel = primaryHref === '/custom-service' ? 'Browse Products' : 'View Custom Service';

  return (
    <section className="hero">
      <div className="hero-bg-montage" aria-hidden="true">
        {validSlides.map((slide, index) => {
          const isActive = index === active;
          const mediaClassName = `hero-bg-slide ${isActive ? 'active' : ''}`;
          return slide.video ? (
            <Fragment key={`${slide.title}-video`}>
              <img
                className={`${mediaClassName} hero-bg-mobile-poster`}
                src={assetPath(slide.image)}
                alt=""
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <video
                className={`${mediaClassName} hero-bg-video`}
                src={assetPath(slide.video)}
                autoPlay
                muted
                loop
                playsInline
                preload={isActive ? 'auto' : 'metadata'}
                poster={assetPath(slide.image)}
              />
            </Fragment>
          ) : (
            <img
              className={mediaClassName}
              src={assetPath(slide.image)}
              alt=""
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              key={`${slide.title}-image`}
            />
          );
        })}
      </div>
      <div className="hero-scrim" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="badge">{current.subtitle}</span>
          <h2>{current.title}</h2>
          <p>{current.text}</p>
          <div className="hero-metrics">
            <div><strong>OEM/ODM</strong><span>Custom Service</span></div>
            <div><strong>Low MOQ</strong><span>Flexible Orders</span></div>
            <div><strong>Factory</strong><span>Direct Support</span></div>
          </div>
          <div className="hero-cta">
            <Link className="btn btn-primary" href={primaryHref}>{current.cta}</Link>
            <Link className="btn btn-secondary" href={secondaryHref}>{secondaryLabel}</Link>
          </div>
        </div>
        <div className="hero-media">
          {validSlides.length > 1 ? (
            <div className="hero-dots" aria-label="Hero slides">
              {validSlides.map((slide, index) => (
                <button
                  className={`hero-dot ${index === active ? 'active' : ''}`}
                  type="button"
                  aria-label={`Show slide ${index + 1}: ${slide.title}`}
                  aria-current={index === active ? 'true' : undefined}
                  onClick={() => goTo(index)}
                  key={slide.title}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
