import OrderModle from "../models/orders.model";
import { Request, Response } from "express";
import UserModle from "../models/users.model";
import ProductsModil from "../models/products.model";

const productModle = new ProductsModil();

const userModle = new UserModle();

const orderModle = new OrderModle();

export const create = async (req: Request, res: Response) => {
  try {
    // check all inputs it exists
    if (!req.body.user_id) {
      return res.status(400).send("Bad request, please add user_id");
    }
    // check the user_id is valid or not
    const users = await userModle.index();
    let counter = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == (req.body.user_id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the user_id that you are locking for is not found, please try another user_id"
        );
    }
    counter = 0;
    const order = await orderModle.create(req.body);
    res.json(order);
  } catch (error) {
    console.log(error);
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const orders = await orderModle.index();
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};
// show order with products
export const show = async (req: Request, res: Response) => {
  try {
    // check the order id is valid or not
    const orders = await orderModle.index();
    let counter = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id == (req.params.id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the order that you are locking for is not found, please try another id"
        );
    }
    counter = 0;
    const order = await orderModle.show(req.params.id as unknown as number);
    const products = await orderModle.addProductsInTheCurrentOrder(order.id);
    res.json({
      ...order,
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    // check all inputs it exists
    if (!req.body.user_id || !req.body.status || !req.body.id) {
      return res
        .status(400)
        .send("Bad request, please add id, user_id, status");
    }
    // check the id is valid or not
    const orders = await orderModle.index();
    let counter = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id == (req.body.id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the order that you are locking for is not found, please try another id"
        );
    }
    counter = 0;
    // check the user_id is valid or not
    const users = await userModle.index();
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == (req.body.user_id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the user_id that you are locking for is not found, please try another user_id"
        );
    }
    const order = await orderModle.update(req.body);
    res.json(order);
  } catch (error) {
    console.log(error);
  }
};

export const deletee = async (req: Request, res: Response) => {
  try {
    // check the id is valid or not
    const orders = await orderModle.index();
    let counter = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id == (req.params.id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the order that you are locking for is not found, please try another id"
        );
    }
    counter = 0;
    const order = await orderModle.delete(req.params.id as unknown as number);
    res.json(order);
  } catch (error) {
    console.log(error);
  }
};

export const CurrentOrderByUser = async (req: Request, res: Response) => {
  try {
    // check the id is valid or not
    const users = await userModle.index();
    let counter = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == (req.params.id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the user_id that you are locking for is not found, please try another user_id"
        );
    }
    counter = 0;
    const order = await orderModle.CurrentOrderByUser(
      req.params.id as unknown as number
    );
    const products = await orderModle.addProductsInTheCurrentOrder(order.id);
    res.json({
      ...order,
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const CompletedOrderByUser = async (req: Request, res: Response) => {
  try {
    // check the id is valid or not
    const users = await userModle.index();
    let counter = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == (req.params.id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the user_id that you are locking for is not found, please try another user_id"
        );
    }
    counter = 0;
    // cheak if the order is completed or not
    const orderForTest = await orderModle.CurrentOrderByUser(
      req.params.id as unknown as number
    );
    if (orderForTest.status !== "complete") {
      return res
        .status(400)
        .send("the order is still active, please try anothe one");
    }
    const order = await orderModle.CompletedOrderByUser(
      req.params.id as unknown as number
    );
    const products = await orderModle.addProductsInTheCurrentOrder(order.id);
    res.json({
      ...order,
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    // check all inputs it exists
    if (!req.body.order_id || !req.body.product_id || !req.body.quantity) {
      return res
        .status(400)
        .send("Bad request, please add order_id, product_id, quantity");
    }
    // check if the order id is exists
    const orders = await orderModle.index();
    let counter = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id == (req.body.order_id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the order that you are locking for is not found, please try another id"
        );
    }
    counter = 0;
    // check if the product id is exists
    const products = await productModle.index();
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == (req.body.product_id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the product that you are locking for is not found, please try another id"
        );
    }
    counter = 0;
    const po = await orderModle.addProduct(req.body);
    res.json(po);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductFromOrder = async (req: Request, res: Response) => {
  try {
    const { product_id, order_id } = req.body;
    // check all inputs it exists
    if (!order_id || !product_id) {
      return res
        .status(400)
        .send("Bad request, please add order_id, product_id");
    }
    // check if the product id is exists
    const products = await productModle.index();
    let counter = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == (product_id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the product that you are locking for is not found, please try another id"
        );
    }
    counter = 0;
    // check if the order id is exists
    const orders = await orderModle.index();
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id == (order_id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the order that you are locking for is not found, please try another id"
        );
    }
    counter = 0;
    const po = await orderModle.deleteProductFromOrder(
      product_id as unknown as number,
      order_id as unknown as number
    );
    res.json(po);
  } catch (error) {
    console.log(error);
  }
};
