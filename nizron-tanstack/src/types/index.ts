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

export interface PricingBullet {
  text: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  price: number;
  bullets: PricingBullet[];
}

export interface Technology {
  id: string;
  name: string;
}

export interface ServiceDetailCard {
  title: string;
  description: string;
  image?: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description?: string;
  serviceCards: ServiceDetailCard[];
  technologies: Technology[];
  pricingPlans: PricingPlan[];
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image?: string;
  skillSet: string[];
}
