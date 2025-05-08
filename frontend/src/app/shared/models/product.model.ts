import { ProductImage } from './ProductImage';
export interface Product {
    description: any;
    expiry: any;
    unit: any;
    id: number;
    imageBanner: string;
    name: string;
    price: number;
    oldPrice: number;
    quantity: number;
    quantitySold: number;
    category: {
      id:number;
      name: string;
    };
    productImages: ProductImage[]; 
}
  