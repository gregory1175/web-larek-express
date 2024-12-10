import { NextFunction, Request, Response } from "express";
import { faker } from "@faker-js/faker";
import Product from "../models/product";
import { BadRequestError, ServerError } from "../errors";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { items, total } = req.body;

  try {
    if (!Array.isArray(items) || items.length === 0) {
      return next(new BadRequestError("Массив элементов не может быть пустым"));
    }

    const products = await Product.find({
      _id: { $in: items },
      price: { $ne: null },
    });

    const actualTotal = products.reduce(
      (acc, product) => acc + product.price,
      0
    );

    if (actualTotal !== total) {
      return next(new BadRequestError("Неправильная сумма заказа"));
    }

    const orderId = faker.number.hex({ min: 1000000000, max: 9999999999 });

    return res.status(200).send({
      id: orderId,
      total: actualTotal,
    });
  } catch (error) {
    return next(new ServerError(`Ошибка сервера: ${JSON.stringify(error)}`));
  }
};

export default createOrder;
