export type Artwork = {
  url: string;
  artist: string;
  title: string;
  link?: string;
};

// Curated, gallery-style background artworks (Unsplash, free to use).
// Replace with your own artist-curated catalog later.
export const heroArtworks: Artwork[] = [
  {
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2400&q=80",
    artist: "Sergei Akulich",
    title: "Mountain Light"
  },
  {
    url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=2400&q=80",
    artist: "Pawel Czerwinski",
    title: "Liquid Gradient"
  },
  {
    url: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=2400&q=80",
    artist: "Efe Kurnaz",
    title: "Color Field"
  },
  {
    url: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=2400&q=80",
    artist: "Sean O.",
    title: "Coastal Dawn"
  },
  {
    url: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?auto=format&fit=crop&w=2400&q=80",
    artist: "Aleksandar Pasaric",
    title: "Aurora"
  }
];
