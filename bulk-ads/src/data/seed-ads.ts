import type { AdVariation, GlobalSettings } from "../types";

export const defaultGlobalSettings: GlobalSettings = {
  colorScheme: [
    { color: "#8D7B6A", weight: 40 },
    { color: "#FFFFFF", weight: 20 },
    { color: "#2C2C2C", weight: 30 },
    { color: "#FF6B35", weight: 10 },
  ],
  fontFamily: "Space Grotesk",
};

export const seedAds: AdVariation[] = [
  {
    id: "ad-1",
    headline: "Elevate Your Brand",
    subtext: "Premium design solutions that transform how your audience sees you.",
    ctaText: "Get Started",
    showLogo: true,
    colorMapping: [0, 1, 3, 1],
  },
  {
    id: "ad-2",
    headline: "Think Different",
    subtext: "Bold strategies for brands that refuse to blend in.",
    ctaText: "Learn More",
    showLogo: true,
    colorMapping: [2, 1, 0, 1],
  },
  {
    id: "ad-3",
    headline: "Summer Collection",
    subtext: "Curated pieces for the modern creative. Limited availability.",
    ctaText: "Shop Now",
    showLogo: true,
    colorMapping: [1, 2, 3, 1],
  },
  {
    id: "ad-4",
    headline: "Scale Faster",
    subtext: "AI-powered tools that grow with your ambition.",
    ctaText: "Try Free",
    showLogo: true,
    colorMapping: [3, 1, 2, 1],
  },
];
