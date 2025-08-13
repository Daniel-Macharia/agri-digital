export { default as ProductsPage } from './ProductsPage';
// Updated Product interface to include all properties used across components
interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    quality: string;
    image: string | null;
    status: string;
    unit?: string;
    createdAt?: string;
    projectName?: string;
    type?: 'livestock' | 'crop';
    livestockType?: string;
    isMergedProduct?: boolean;
    componentProduct1?: string;
    componentProduct2?: string;
    product1?: string;
    product2?: string;
}

interface LivestockFormData {
    projectName: string;
    livestockType: string;
}

interface CropFormData {
    projectName: string;
}

interface EditData {
    name: string;
    price: number;
    quantity: number;
    quality: string;
    componentProduct1: string;
    componentProduct2: string;
}

interface MergeProductFormData {
    name: string;
    product1: string;
    product2: string;
    quantity: string;
    unit?: string;
    quality: string;
    image: File | null;
    price: string;
}

interface FormErrors {
    [key: string]: string;
}

interface MergeProductModalProps {
    show: boolean;
    handleClose: () => void;
    onSave: (product: Omit<Product, 'id'>) => Promise<void>;
    products: Product[];
}

interface AddProductCardProps {
    onAddNewProduct: () => void;
}

interface ProductListProps {
    products: Product[];
    onProductUpdate: (productId: number) => void;
    onProductDelete: (productId: number) => void;
    onProductEdit: (productId: number, updatedData: EditData) => void;
    onAddNewProduct: () => void;
}

interface CropProjectModalProps {
    show: boolean;
    onHide: () => void;
    onBack: () => void;
    onSubmit: (formData: CropFormData) => void;
}

interface LivestockProjectModalProps {
    show: boolean;
    onHide: () => void;
    onBack: () => void;
    onSubmit: (formData: LivestockFormData) => void;
}

interface ProjectSelectionModalProps {
    show: boolean;
    onHide: () => void;
    onCropProject: () => void;
    onLivestockProject: () => void;
}

interface ProductCardProps {
    product: Product;
    onUpdate: () => void;
    onDelete: () => void;
    onEdit: (editData: EditData) => void;
}

type LivestockType = 'cow' | 'pig' | 'goat';

export type {
    Product,
    LivestockFormData,
    CropFormData,
    EditData,
    MergeProductFormData,
    FormErrors,
    MergeProductModalProps,
    AddProductCardProps,
    ProductListProps,
    CropProjectModalProps,
    LivestockProjectModalProps,
    ProjectSelectionModalProps,
    LivestockType,
    ProductCardProps}