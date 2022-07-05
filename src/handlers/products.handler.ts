import { Request, Response } from "express";
import ProductsModil from "../models/products.model";

const productModle = new ProductsModil();

export const create = async (req: Request, res: Response) => {
  try {
    // check all inputs it exists
    if (!req.body.name || !req.body.price || !req.body.category) {
      return res
        .status(400)
        .send("Bad request, please add name, price, category");
    }
    const product = await productModle.create(req.body);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const product = await productModle.index();
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    // check the id is valid or not
    const products = await productModle.index();
    let counter = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == (req.params.id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the id that you are locking for is not found, please try another id"
        );
    }
    counter = 0;
    const product = await productModle.show(req.params.id as unknown as number);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    // check all inputs it exists
    if (
      !req.body.name ||
      !req.body.price ||
      !req.body.category ||
      !req.body.id
    ) {
      return res
        .status(400)
        .send("Bad request, please add id, name, price, category");
    }
    // check the id is valid or not
    const products = await productModle.index();
    let counter = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == (req.body.id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the id that you are locking for is not found, please try another id"
        );
    }
    counter = 0;
    const product = await productModle.update(req.body);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const deletee = async (req: Request, res: Response) => {
  try {
    // check the product id is valid or not
    const products = await productModle.index();
    let counter = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == (req.params.id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the id that you are locking for is not found, please try another id"
        );
    }
    counter = 0;
    const product = await productModle.delete(
      req.params.id as unknown as number
    );
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const productsByCategory = async (req: Request, res: Response) => {
  try {
    // check the catigory is valid or not
    const products = await productModle.index();
    let counter = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].category == (req.params.category as unknown as string)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the category that you are locking for is not found, please try another category"
        );
    }
    counter = 0;
    const product = await productModle.productsByCategory(
      req.params.category as unknown as string
    );
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};
