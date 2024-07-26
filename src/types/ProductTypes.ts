export interface Product {
    SKU: string;
    title: string;
    description: string;
    featuredImage: string | File;
    category: string;
    tags: string[];
    // pdfFiles: string[];
    // excelFiles: string[];
    discount: number;
    variants: Variant[];
    reviews: Review[];
  }
  
export interface productPreview {
    SKU: string;
    title: string;
    featuredImage: string;
    category: string;
    price: number;
    discount: number;
}

export interface VariantType {
type: string;
unit: string;
value: number | string;
}

export interface Variant {
    image: File | string | null;
    imagePreview: string;
    name: string;
    sku: string;
    inStock: number;
    price: number;
    discountType: '%' | 'RON';
    discountPrice: number | 'Discounted';
    types: VariantType[];
  }
  
export interface Review {
    name: string;
    email: string;
    rating: number;
    review: string;
  }
