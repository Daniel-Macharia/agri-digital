// types.ts - Define shared interfaces
export interface Article {
  id: number | string;
  title: string;
  author?: string;
  readTime?: string;
  views?: string;
  category?: string;
  description?: string;
  price?: number;
  image?: string;
  datePublished?: string;
  rating?: number;
  reviewCount?: number;
}

export interface ArticlesSectionProps {
  articles: Article[];
  title?: string;
  icon?: React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>;
  onViewMore?: () => void;
  onPurchaseClick?: (article: Article) => void;
  onCardClick?: (article: Article) => void;
  showViewMore?: boolean;
  cardProps?: Record<string, unknown>;
  className?: string;
}

export interface Training {
  id: number | string;
  title: string;
  organizationName?: string;
  duration?: string;
  location?: string;
  dateTime?: string;
  slotsLeft?: string;
  description?: string;
  price?: number;
  image?: string;
  datePublished?: string;
}

export interface PaymentData {
  paymentMethod: string;
  mpesaPhone?: string;
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cvv?: string;
  barterDescription?: string;
}
export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
  duration?: string; 
  size: string;
  uploadedAt: Date;
}

export interface DocumentItem {
  createElement(arg0: string): unknown;
  body: string;
  //createElement(arg0: string): unknown;
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  uploadedAt: Date;
  description?: string;
  pages?: number;
}