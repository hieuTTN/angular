import { Product } from './product.model';

export interface ProductRequest {
  product: Product;
  linkLinkImages: string[];
}