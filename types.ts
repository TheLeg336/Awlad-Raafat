export enum LayoutOption {
  ModernSleek = 'modern-sleek',
}

export enum ColorSchemeOption {
  BlackGold = 'black-gold',
}

export enum TypographyOption {
  LuxeModern = 'luxe-modern',
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

export type CustomImages = Record<string, string>;
