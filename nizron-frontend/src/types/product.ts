export interface FAQ {
  id: string;
  questionTitle: string;
  category: string;
  answer: string;
}

export interface ProductImage {
  id: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  images: ProductImage[];
  faqs: FAQ[];
  productUsePdf?: string;
}
