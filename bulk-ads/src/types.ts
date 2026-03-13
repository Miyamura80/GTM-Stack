export interface ColorWeight {
  color: string;
  weight: number;
}

export interface GlobalSettings {
  colorScheme: ColorWeight[];
  fontFamily: string;
}

export interface AdVariation {
  id: string;
  headline: string;
  subtext: string;
  ctaText: string;
  showLogo: boolean;
  colorMapping: number[]; // indices into global colorScheme, order: [bg, text, cta-bg, cta-text]
}
