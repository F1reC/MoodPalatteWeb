export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  pointsCost: number;
  stock: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Transaction {
  transactionId: number;
  userId: number;
  changeAmount: number;
  transactionType: string;
  description: string;
}

export interface TransactionResponse {
  code: number;
  message: string;
  data: {
    total: number;
    rows: Transaction[];
  }
}

export interface AddressResponse {
  code: number;
  message: string;
  data: ServerAddress[];
}

export interface ServerAddress {
  addressId: number;
  userId: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServerUser {
  userId: number;
  username: string;
  email: string;
  gender: string;
  status: string;
}

export interface UserResponse {
  code: number;
  message: string;
  data: ServerUser[];
}