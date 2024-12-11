import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import ValidationError from '../errors/validation-error';
import Product from '../models/product';
import { ConflictError } from '../errors';

export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find({});
    return res.send({ items: products, total: products.length });
  } catch (error) {
    return next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    title, image, category, description, price,
  } = req.body;

  try {
    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return next(
        new ConflictError('Продукт с таким названием уже существует'),
      );
    }
    const product = await Product.create({
      title,
      image,
      category,
      description,
      price,
    });

    return res.status(201).send({
      id: product._id,
      title: product.title,
      image: product.image,
      category: product.category,
      description: product.description,
      price: product.price,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return ValidationError(error, next);
    }
    return next(error);
  }
};
