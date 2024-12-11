import { model, Schema } from 'mongoose';
import { IProduct } from '../types/types';

const productSchema = new Schema<IProduct>({
  description: {
    type: String,
    default: '',
  },
  image: {
    type: { fileName: String, originalName: String },
    required: [true, 'имя файла и оригинальное имя обязательно'],
  },
  title: {
    type: String,
    required: [true, 'Название товара обязательно'],
    unique: true,
    minlength: [2, 'Название товара должно быть не менее 2 символов'],
    maxlength: [30, 'Название товара должно быть не более 30 символов'],
  },
  category: {
    type: String,
    required: [true, 'Категория товара обязательна'],
  },
  price: {
    type: Number,
    default: null,
  },
});

const product = model<IProduct>('product', productSchema);

export default product;
