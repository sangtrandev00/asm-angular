import { IProduct } from './Product';
export interface ICategory {
  _id: string;
  name: string;
  cateImage: string;
  description: string;
  // qtyProducts?: number;
  createdAt?: string;
  updatedAt?: string;
  // products?: [IProduct[]];
}
