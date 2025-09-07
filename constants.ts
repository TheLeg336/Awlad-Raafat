
import { LayoutOption, ColorSchemeOption, TypographyOption, ColorScheme, Product } from './types';
import type { TFunction } from './App';

export const COLOR_SCHEMES: Record<ColorSchemeOption, ColorScheme> = {
  [ColorSchemeOption.BlackGold]: {
    light: {
        primary: '#E8C547',
        secondary: '#14213D',
        background: '#FFFFFF',
        textPrimary: '#1A202C',
        textSecondary: '#4A5568',
        success: '#DAB449'
    },
    dark: {
      primary: '#F0B429',
      secondary: '#14213D',
      background: '#1A202C',
      textPrimary: '#E5E5E5',
      textSecondary: '#A9A9A9',
      success: '#F0B429',
    },
    defaultMode: 'dark',
  },
};

// FIX: Added LAYOUT_OPTIONS, COLOR_SCHEME_OPTIONS, and TYPOGRAPHY_OPTIONS
// which were missing and causing import errors in Customizer.tsx.
export const LAYOUT_OPTIONS = [
  { id: LayoutOption.ModernSleek, label: 'Modern & Sleek' },
];

export const COLOR_SCHEME_OPTIONS = [
  { id: ColorSchemeOption.BlackGold, label: 'Black & Gold' },
];

export const TYPOGRAPHY_OPTIONS = [
  { id: TypographyOption.LuxeModern, label: 'Luxe Modern' },
];

export const PRODUCTS: Product[] = [
  { id: 1, nameKey: 'product_sofa_name', categoryKey: 'product_sofa_category', imageUrl: 'https://picsum.photos/seed/sofa/800/600' },
  { id: 2, nameKey: 'product_chair_name', categoryKey: 'product_chair_category', imageUrl: 'https://picsum.photos/seed/chair/800/600' },
  { id: 3, nameKey: 'product_table_name', categoryKey: 'product_table_category', imageUrl: 'https://picsum.photos/seed/table/800/600' },
  { id: 4, nameKey: 'product_lamp_name', categoryKey: 'product_lamp_category', imageUrl: 'https://picsum.photos/seed/lamp/800/600' },
  { id: 5, nameKey: 'product_bed_name', categoryKey: 'product_bed_category', imageUrl: 'https://picsum.photos/seed/bed/800/600' },
  { id: 6, nameKey: 'product_cabinet_name', categoryKey: 'product_cabinet_category', imageUrl: 'https://picsum.photos/seed/cabinet/800/600' },
];

export const getTextContent = (t: TFunction) => ({
  hero: {
    minimalist: {
      title: t('hero_minimalist_title'),
      subtitle: t('hero_minimalist_subtitle'),
      cta: t('hero_cta_explore')
    },
    classic: {
      title: t('hero_classic_title'),
      subtitle: t('hero_classic_subtitle'),
      cta: t('hero_cta_discover')
    },
    artistic: {
      title: t('hero_artistic_title'),
      subtitle: t('hero_artistic_subtitle'),
      cta: t('hero_cta_experience')
    },
    'monochromatic-gallery': {
      title: t('hero_gallery_title'),
      subtitle: t('hero_gallery_subtitle'),
      cta: t('hero_cta_explore')
    },
    'architectural-bold': {
      title: t('hero_architectural_title'),
      subtitle: t('hero_architectural_subtitle'),
      cta: t('hero_cta_discover')
    },
    'modern-sleek': {
      title: t('hero_sleek_title'),
      subtitle: t('hero_sleek_subtitle'),
      cta: t('hero_cta_learn_more')
    }
  },
  products: {
    title: t('products_title'),
    subtitle: t('products_subtitle'),
    cta: t('products_cta')
  },
  about: {
    title: t('about_title'),
    p1: t('about_p1'),
    p2: t('about_p2'),
  },
});


export const TEXTS: Record<string, Record<string, string>> = {
  en: {
    logo: 'Awlad Raafat',
    nav_home: 'Home',
    nav_shop: 'Shop',
    nav_about: 'About',
    nav_locations: 'Locations',
    nav_contact: 'Contact',
    lang_toggle_en: 'English',
    lang_toggle_ar: 'العربية',
    hero_minimalist_title: 'Design That Breathes',
    hero_minimalist_subtitle: 'Discover harmony in form and function. Uncompromising quality for the modern home.',
    hero_classic_title: 'A Legacy of Luxury',
    hero_classic_subtitle: 'Experience timeless elegance, crafted with passion and heritage for generations.',
    hero_artistic_title: 'Where Art Meets Furniture',
    hero_artistic_subtitle: 'Bold designs that transform spaces and inspire conversation. Live your masterpiece.',
    hero_gallery_title: 'The Art of Simplicity',
    hero_gallery_subtitle: 'Curated forms, refined materials. A new perspective on luxury living.',
    hero_architectural_title: 'Structured Elegance',
    hero_architectural_subtitle: 'Bold lines and confident forms that define space with intention and grace.',
    hero_sleek_title: 'The Future of Design',
    hero_sleek_subtitle: 'Engineered for simplicity. Crafted for life.',
    hero_cta_explore: 'Explore Collections',
    hero_cta_discover: 'Discover Our Heritage',
    hero_cta_experience: 'Experience the Art',
    hero_cta_learn_more: 'Learn More',
    products_title: 'Featured Collections',
    products_subtitle: 'Hand-selected pieces that define elegance and comfort.',
    products_cta: 'View Details',
    about_title: 'Our Story: The Art of Egyptian Craftsmanship',
    about_p1: 'Founded in the heart of Egypt, Awlad Raafat began with a simple vision: to blend ancestral woodworking techniques with contemporary design. For over fifty years, our family has been dedicated to creating furniture that is not just an object, but a piece of heritage.',
    about_p2: 'Today, we bring this legacy to the world, with showrooms in Cairo, Alexandria, and now serving our discerning clients in the United States. Each piece tells a story of meticulous craftsmanship and a commitment to unparalleled quality.',
    footer_contact_header: 'Contact Us',
    footer_egypt_office: 'Egypt Office',
    footer_us_office: 'USA Office',
    footer_quick_links: 'Quick Links',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_social_header: 'Follow Us',
    footer_copyright: '© 2024 Awlad Raafat. All Rights Reserved.',
    product_sofa_name: 'The Nile Sofa',
    product_sofa_category: 'Living Room',
    product_chair_name: 'Pharaoh Armchair',
    product_chair_category: 'Seating',
    product_table_name: 'Luxor Dining Table',
    product_table_category: 'Dining',
    product_lamp_name: 'Giza Floor Lamp',
    product_lamp_category: 'Lighting',
    product_bed_name: 'Cleopatra Bed',
    product_bed_category: 'Bedroom',
    product_cabinet_name: 'Alexandria Cabinet',
    product_cabinet_category: 'Storage',
  },
  ar: {
    logo: 'أولاد رأفت',
    nav_home: 'الرئيسية',
    nav_shop: 'المجموعات',
    nav_about: 'قصتنا',
    nav_locations: 'فروعنا',
    nav_contact: 'اتصل بنا',
    lang_toggle_en: 'English',
    lang_toggle_ar: 'العربية',
    hero_minimalist_title: 'تصميم يتنفس بالحياة',
    hero_minimalist_subtitle: 'اكتشفوا التناغم المثالي بين الشكل والوظيفة. جودة لا تضاهى لمنزلكم العصري.',
    hero_classic_title: 'إرث من الفخامة',
    hero_classic_subtitle: 'عِيشوا تجربة الأناقة الخالدة، المصنوعة بشغف وإرث عريق تتوارثه الأجيال.',
    hero_artistic_title: 'حيث يرتقي الأثاث إلى الفن',
    hero_artistic_subtitle: 'تصاميم جريئة تعيد تعريف المساحات وتلهم الحوار. اقتنوا تحفتكم الفنية التي تعبر عنكم.',
    hero_gallery_title: 'جوهر البساطة الأنيقة',
    hero_gallery_subtitle: 'أشكال منتقاة، مواد مصقولة. منظور جديد للمعيشة الفاخرة.',
    hero_architectural_title: 'أناقة هيكلية',
    hero_architectural_subtitle: 'خطوط جريئة وأشكال واثقة تحدد المساحة بقوة ورشاقة.',
    hero_sleek_title: 'مستقبل التصميم',
    hero_sleek_subtitle: 'مصممة للبساطة. مصنوعة للحياة.',
    hero_cta_explore: 'اكتشفوا المجموعات',
    hero_cta_discover: 'اكتشفوا تراثنا',
    hero_cta_experience: 'عيشوا التجربة الفنية',
    hero_cta_learn_more: 'اعرف المزيد',
    products_title: 'مجموعاتنا المميزة',
    products_subtitle: 'قطعٌ فنية مختارة بعناية لتعيد تعريف الأناقة والراحة في مساحاتكم.',
    products_cta: 'اكتشفوا المزيد',
    about_title: 'قصتنا: فن الحرفية المصرية الأصيلة',
    about_p1: 'تجسيداً لرؤية تمزج بين أصالة حرفة النجارة المصرية وتطلعات التصميم المعاصر، انطلقت مسيرة "أولاد رأفت" من قلب مصر. على مدى أكثر من خمسة عقود، كرست عائلتنا شغفها وجهدها لإبداع قطع أثاث تتجاوز مفهومها المادي، لتصبح إرثاً فنياً بحد ذاته.',
    about_p2: 'واليوم، نحمل هذا الإرث العريق بفخر إلى العالم، عبر معارضنا في القاهرة والإسكندرية، ونقدمه لعملائنا المميزين في الولايات المتحدة. كل قطعة بين أيديكم هي حكاية تُروى فصولها بالحرفية المتقنة والالتزام المطلق بأرقى معايير الجودة.',
    footer_contact_header: 'تواصلوا معنا',
    footer_egypt_office: 'مكتب مصر',
    footer_us_office: 'مكتب الولايات المتحدة',
    footer_quick_links: 'روابط سريعة',
    footer_privacy: 'سياسة الخصوصية',
    footer_terms: 'شروط الخدمة',
    footer_social_header: 'تابعونا',
    footer_copyright: '© 2024 أولاد رأفت. جميع الحقوق محفوظة.',
    product_sofa_name: 'أريكة النيل',
    product_sofa_category: 'غرفة المعيشة',
    product_chair_name: 'مقعد فرعون',
    product_chair_category: 'مقاعد',
    product_table_name: 'طاولة طعام الأقصر',
    product_table_category: 'غرفة الطعام',
    product_lamp_name: 'مصباح الجيزة الأرضي',
    product_lamp_category: 'إضاءة',
    product_bed_name: 'سرير كليوباترا',
    product_bed_category: 'غرفة النوم',
    product_cabinet_name: 'خزانة الإسكندرية',
    product_cabinet_category: 'تخزين',
  }
};