export interface ProductColor {
  name: string;
  code: string;
  image?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'speaker' | 'smartwatch' | 'headphone' | 'accessories';
  categoryLabel: string;
  originalPrice: number;
  price: number;
  badge?: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  images: string[];
  colors?: ProductColor[];
  shortDescription: string;
  fullDescription: string[];
  keyFeatures: string[];
  specs: ProductSpec[];
  warranty?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  address: string;
  area: 'insideDhaka' | 'outsideDhaka';
  notes?: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryArea: string;
  deliveryCharge: number;
  subtotal: number;
  totalAmount: number;
  notes?: string | null;
  status: string;
  createdAt: string;
  items: {
    id: string;
    productName: string;
    productSlug: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
    selectedColor?: string | null;
    totalPrice: number;
  }[];
}
