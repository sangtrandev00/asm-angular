export enum OrderStatus {
  ALL = 'all',
  UNCONFIRMED = 'Waiting to Confirm',
  CONFIRMED = 'confirmed',
  SHIPPING = 'shipping',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export const orderStatusMap: Record<string, OrderStatus> = {
  all: OrderStatus.ALL,
  'Waiting to Confirm': OrderStatus.UNCONFIRMED,
  confirmed: OrderStatus.CONFIRMED,
  shipping: OrderStatus.SHIPPING,
  success: OrderStatus.SUCCESS,
  failed: OrderStatus.FAILED,
};

type UserInfo = {
  id?: string;
  email: string;
  fullName: string;
  phone: string;
  shippingAddress: string;
};
export interface CartItem {
  prodId: string;
  name?: string;
  image?: string;
  price?: number;
  qty: number;
}
export interface ICart {
  cartList: CartItem[];
  totalPrice?: number;
}

export interface IOrder {
  _id?: string;
  shippingFee?: number;
  vatFee?: number;
  paymentMethod?: string;
  status?: OrderStatus;
  user: UserInfo;
  products: { items: (CartItem | undefined)[]; totalPrice: number };
  note?: string;
  createdAt?: string;
  updatedAt?: string;
}
