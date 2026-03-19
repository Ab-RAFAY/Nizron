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
  serviceCards: ServiceDetailCard[];
  technologies: Technology[]; // Object-based for Neon compatibility
  pricingPlans: PricingPlan[];
}
