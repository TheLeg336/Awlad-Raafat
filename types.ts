
export enum LayoutOption {
  Minimalist = 'minimalist',
  Classic = 'classic',
  Artistic = 'artistic',
  MonochromaticGallery = 'monochromatic-gallery',
  ArchitecturalBold = 'architectural-bold',
  ModernSleek = 'modern-sleek',
}

export enum ColorSchemeOption {
  PlatinumCharcoal = 'platinum-charcoal',
  EmeraldGold = 'emerald-gold',
  SapphireSilver = 'sapphire-silver',
  UniversalSerenity = 'universal-serenity',
  NaturalElegance = 'natural-elegance',
  ModernMinimalism = 'modern-minimalism',
  MidnightGold = 'midnight-gold',
  IvoryTaupe = 'ivory-taupe',
  DeepSea = 'deep-sea',
  BlackGold = 'black-gold',
  ModernSleek = 'modern-sleek',
}

export enum TypographyOption {
  Modern = 'modern',
  Classic = 'classic',
  Contemporary = 'contemporary',
  LuxeModern = 'luxe-modern',
  RefinedSerif = 'refined-serif',
  ModernSleek = 'modern-sleek',
}

export enum LanguageOption {
  English = 'en',
  Arabic = 'ar',
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  success: string;
}

export interface ColorScheme {
  light: ColorPalette;
  dark: ColorPalette;
  defaultMode: 'light' | 'dark';
}


export interface Product {
  id: number;
  nameKey: string;
  categoryKey: string;
  imageUrl: string;
}