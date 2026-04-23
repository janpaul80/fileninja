"use client";

import * as React from "react";
import { heroArtworks } from "@/lib/artworks";

const INTERVAL_MS = 7000;

export default function HeroBackground() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroArtworks.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {heroArtworks.map((art, i) => (
        <div
          key={art.url}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-[2200ms] ease-out"
          style={{
            opacity: i === index ? 1 : 0,
            backgroundImage: `url(${art.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: i === index ? "slow-zoom 20s ease-in-out infinite alternate" : "none"
          }}
        />
      ))}
      <div className="absolute inset-0 hero-overlay" />

      {/* Artist credit (rotates with bg) */}
      <div className="absolute bottom-5 right-5 z-10 text-[11px] uppercase tracking-[0.2em] text-white/70 font-medium">
        <span className="opacity-60 mr-2">Artwork</span>
        <span>{heroArtworks[index].title}</span>
        <span className="opacity-60 mx-2">·</span>
        <span>{heroArtworks[index].artist}</span>
      </div>
    </div>
  );
}
