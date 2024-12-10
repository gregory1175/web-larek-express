export type MongoError = {
  code?: number;
  keyValue?: Record<string, string>;
  statusCode?: number;
  message?: string;
} & Error;

export interface IFile {
  fileName: string;
  originalName: string;
}

export interface IProduct {
  title: string;
  image: IFile;
  category: string;
  description: string;
  price: number;
}

export interface IOrder {
  items: string[];
  total: number;
  payment: 'card' | 'online';
  email: string;
  phone: string;
  address: string;
}
