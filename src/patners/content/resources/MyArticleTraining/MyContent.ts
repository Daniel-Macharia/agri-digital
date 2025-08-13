// MyContent.ts - Updated and Fixed type definitions

export interface MyArticle {
  id: string | number;
  title: string;
  type: 'Article'; // Fixed: literal type instead of string
  views?: number;
  attendees?: number;
  status: 'Published' | 'Under Review';
  price?: number;
  date?: string;
  ratings?: number;
  author?: string;
  readTime?: string;
  category?: string;
  description?: string;
  image?: string;
  datePublished?: string;
  downloads?: number;
  reads?: number;
}

export interface MyTraining {
  id: string | number;
  title: string;
  type: 'Training'; // Fixed: literal type instead of string
  views?: number;
  attendees?: number;
  status: 'Done' | 'Under Review' | 'In Progress';
  price?: number;
  date?: string;
  ratings?: number;
  organizationName?: string;
  duration?: string;
  location?: string;
  dateTime?: string;
  slotsLeft?: string;
  description?: string;
  image?: string;
  datePublished?: string;
  totalSlots?: number;
  registeredCount?: number;
}

export type MyContent = MyArticle | MyTraining;

export interface Participant {
  id: string;
  name: string;
  email: string;
  paymentStatus: 'Complete' | 'Pending';
  amountPaid: number;
  registeredDate: string;
}

// Props interfaces
export interface MyArticleDetailProps {
  article: MyArticle;
  onBackClick: () => void;
  onEdit?: (article: MyArticle) => void;
  onDelete?: (article: MyArticle) => void;
}

export interface MyTrainingDetailProps {
  training: MyTraining;
  onBackClick: () => void;
  onEdit?: (training: MyTraining) => void;
  onDelete?: (training: MyTraining) => void;
  participants?: Participant[];
}

export interface MyArticlesTrainingsProps {
  articles?: MyArticle[];
  trainings?: MyTraining[];
  onCreateClick?: () => void;
  onViewDetails?: (item: MyContent) => void;
  onEdit?: (item: MyContent) => void;
  onDelete?: (item: MyContent) => void;
  itemsPerPage?: number;
  showCreateButton?: boolean;
  createButtonText?: string;
  onCreateArticle?: () => void;
  onCreateTraining?: () => void;
}