export interface IProduct {
  _id?: string;
  name: string;
  oldPrice: number;
  discount?: number;
  images: string;
  thumbnail?: string;
  shortDesc: string;
  fullDesc: string;
  stockQty: number;
  categoryId?:
    | {
        _id: string;
        name: string;
      }
    | string;
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}
