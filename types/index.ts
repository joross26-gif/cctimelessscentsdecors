export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  badges: string[];
  short: string;
  image: string;
  gallery?: string[];
}

export interface CartItem {
  id: string;
  qty: number;
}

export interface Settings {
  brandName: string;
  tagline: string;
  shortBio: string;
  location: string;
  currency: {
    symbol: string;
    code: string;
  };
  social: {
    instagramHandle: string;
    tiktokHandle: string;
    instagramUrl: string;
    tiktokUrl: string;
  };
  contact: {
    email: string;
    whatsAppNumberInternational: string;
  };
  shipping: {
    leadTime: string;
    customOrdersLeadTime: string;
  };
  policies: {
    returns: string;
    care: string;
  };
  automation: {
    checkoutMode: string;
    whatsAppPrefillTemplate: string;
  };
  media: {
    heroVideo: string;
    showcaseVideos: string[];
  };
}
