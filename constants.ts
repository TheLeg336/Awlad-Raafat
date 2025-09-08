import { LayoutOption, ColorSchemeOption, TypographyOption, ColorScheme, Product, type TFunction } from './types';

export const COLOR_SCHEMES: Record<ColorSchemeOption, ColorScheme> = {
  [ColorSchemeOption.BlackGold]: {
    light: {
        primary: '#E8C547',
        primaryHsl: '47, 81%, 60%',
        secondary: '#14213D',
        background: '#FFFFFF',
        textPrimary: '#1A202C',
        textSecondary: '#4A5568',
        success: '#DAB449'
    },
    dark: {
      primary: '#F0B429',
      primaryHsl: '42, 87%, 54%',
      secondary: '#14213D',
      background: '#1A202C',
      textPrimary: '#E5E5E5',
      textSecondary: '#A9A9A9',
      success: '#F0B429',
    },
    defaultMode: 'dark',
  },
};

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

export const TEXTS: Record<string, Record<string, string>> = {
  en: {
    logo: 'Awlad Raafat',
    nav_home: 'Home',
    nav_shop: 'Shop',
    nav_about: 'About',
    nav_contact: 'Contact',
    lang_toggle_en: 'English',
    lang_toggle_ar: 'العربية',
    hero_sleek_title: 'The Future of Design',
    hero_cta_learn_more: 'Explore',
    products_title: 'Featured Collections',
    products_subtitle: 'Hand-selected pieces that define elegance and comfort.',
    visit_us_title: 'Visit Us',
    visit_us_p1: 'We are delighted to welcome you. Come and enjoy a warm cup of coffee with our expert designers together, we’ll create the kitchen of your dreams. At our showroom, inspiration meets craftsmanship, and whatever your style may be, you’ll always find something made just for you.',
    footer_locations_title: 'Our Branches',
    footer_cairo_branch_title: 'Cairo Branch',
    footer_cairo_branch_address: '66 Mohamed refaat Street, next to kfc, El Nozha El Gadida',
    footer_minya_branch_title: 'Minya Branch',
    footer_minya_branch_address: '6 Mostafa Kamel Street, Ard Sultan',
    footer_new_minya_branch_title: 'New Minya Branch',
    footer_new_minya_branch_address: 'Corner Plaza Mall, 2nd Floor, Third District',
    footer_phone_title: 'Contact Us',
    footer_phone_label: 'Phone:',
    footer_phone_number: '01010279777',
    footer_hours: 'Hours: 12 PM - 10 PM (Mon-Sat)',
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
    search_placeholder: 'Search for furniture, styles, and more...',
  },
  ar: {
    logo: 'أولاد رأفت',
    nav_home: 'الرئيسية',
    nav_shop: 'المجموعات',
    nav_about: 'نبذة عنا',
    nav_contact: 'اتصل بنا',
    lang_toggle_en: 'English',
    lang_toggle_ar: 'العربية',
    hero_sleek_title: 'مستقبل التصميم',
    hero_cta_learn_more: 'استكشف',
    products_title: 'مجموعاتنا المميزة',
    products_subtitle: 'قطعٌ فنية مختارة بعناية لتعيد تعريف الأناقة والراحة في مساحاتكم.',
    visit_us_title: 'زورونا',
    visit_us_p1: 'يسعدنا أن نرحب بكم. تعالوا واستمتعوا بفنجان من القهوة الدافئة مع مصممينا الخبراء، وسنصنع معًا مطبخ أحلامكم. في صالة العرض لدينا، يلتقي الإلهام بالحرفية، ومهما كان أسلوبكم، ستجدون دائمًا شيئًا مصنوعًا خصيصًا لكم.',
    footer_locations_title: 'الفروع',
    footer_cairo_branch_title: 'فرع القاهرة',
    footer_cairo_branch_address: '٦٦ شارع المؤرخ محمد رفعت بجوار كنتاكي خلف السندباد، النزهة الجديدة',
    footer_minya_branch_title: 'فرع المنيا',
    footer_minya_branch_address: '٦ شارع مصطفي كامل، أرض سلطان',
    footer_new_minya_branch_title: 'فرع المنيا الجديدة',
    footer_new_minya_branch_address: 'مول كورنر بلازا، الدور الثاني، الحي الثالث',
    footer_phone_title: 'اتصل بنا',
    footer_phone_label: 'الهاتف:',
    footer_phone_number: '01010279777',
    footer_hours: 'ساعات العمل: ١٢ ظهراً - ١٠ مساءً (من الإثنين إلى السبت)',
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
    search_placeholder: 'ابحث عن الأثاث والأنماط والمزيد...',
  }
};