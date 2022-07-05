import database from "../../database";
import UserModel from "../users.model";
import OrderModle from "../orders.model";
import User from "../../types/users.types";
import Order from "../../types/orders.type";
import Prouduct_Order from "../../types/prouduct_order.type";
import ProductModle from "../products.model";
import Product from "../../types/products.type";

const productModle = new ProductModle();
const userModle = new UserModel();
const orderModle = new OrderModle();

describe("order modle", () => {
  describe("order methouds exists", () => {
    it("create order method exists", () => {
      expect(orderModle.create).toBeDefined();
    });
    it("index order method exists", () => {
      expect(orderModle.index).toBeDefined();
    });
    it("show order method exists", () => {
      expect(orderModle.show).toBeDefined();
    });
    it("update order method exists", () => {
      expect(orderModle.update).toBeDefined();
    });
    it("delete order method exists", () => {
      expect(orderModle.delete).toBeDefined();
    });
    it("CurrentOrderByUser method exists", () => {
      expect(orderModle.CurrentOrderByUser).toBeDefined();
    });
    it("CompletedOrderByUser method exists", () => {
      expect(orderModle.CompletedOrderByUser).toBeDefined();
    });
    it("addProduct method exists", () => {
      expect(orderModle.addProduct).toBeDefined();
    });
    it("deleteProductFromOrder method exists", () => {
      expect(orderModle.deleteProductFromOrder).toBeDefined();
    });
    it("addProductsInTheCurrentOrder method exists", () => {
      expect(orderModle.addProductsInTheCurrentOrder).toBeDefined();
    });
  });

  describe("orders Modle Logic", () => {
    const user = {
      first_name: "test",
      last_name: "test",
      password: "test123",
    } as User;

    const order = {} as Order;

    const product = {
      name: "test",
      price: 10,
      category: "categorytset",
    } as Product;

    const prouduct_order = {
      quantity: 7,
    } as Prouduct_Order;

    beforeAll(async () => {
      const createdUser = await userModle.create(user);
      user.id = createdUser.id;
      order.user_id = user.id;

      const createdOrder = await orderModle.create(order);
      order.id = createdOrder.id;
      order.status = createdOrder.status;
      prouduct_order.order_id = order.id;

      const createdproduct = await productModle.create(product);
      product.id = createdproduct.id;
      prouduct_order.product_id = product.id;

      const createdprouduct_order = await orderModle.addProduct(prouduct_order);
      prouduct_order.id = createdprouduct_order.id;
    });

    afterAll(async () => {
      const con = await database.connect();
      const sql =
        "DELETE FROM prouduct_order;\nALTER SEQUENCE prouduct_order_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;";
      await con.query(sql);
      con.release();
    });

    it("expect create method to return new order", async () => {
      const createdOrder = await orderModle.create({
        user_id: user.id,
      } as Order);
      expect(createdOrder).toEqual({
        id: createdOrder.id,
        user_id: createdOrder.user_id,
        status: "active",
      } as Order);
    });

    it("expect index method to return all orders", async () => {
      const allorders = await orderModle.index();
      expect(allorders.length).toBe(2);
    });

    it("expect show method to return expected order by id", async () => {
      const orderById = await orderModle.show(order.id as number);
      expect(orderById.id).toBe(order.id);
      expect(orderById.user_id).toBe(order.user_id);
      expect(orderById.status).toBe("active");
    });

    it("expect update method to return updated order", async () => {
      const updatedorder = await orderModle.update({
        id: order.id,
        user_id: user.id,
        status: "complete",
      } as Order);
      expect(updatedorder.id).toBe(order.id);
      expect(updatedorder.user_id).toBe(user.id);
      expect(updatedorder.status).toBe("complete");
    });

    it("expect CurrentOrderByUser method to return CurrentOrderByUser", async () => {
      const CurrentOrderByUser = await orderModle.CurrentOrderByUser(
        user.id as number
      );
      expect(CurrentOrderByUser.user_id).toBe(order.user_id);
      expect(CurrentOrderByUser.status).toBe(order.status);
    });

    it("expect CompletedOrderByUser method to return CompletedOrderByUser", async () => {
      const CompletedOrderByUser = await orderModle.CompletedOrderByUser(
        user.id as number
      );
      expect(CompletedOrderByUser.id).toBe(order.id);
      expect(CompletedOrderByUser.user_id).toBe(order.user_id);
      expect(CompletedOrderByUser.status).toBe("complete");
    });

    it("expect addProduct method to return new prouduct_order", async () => {
      const createdprouduct_order = await orderModle.addProduct({
        order_id: order.id,
        product_id: product.id,
        quantity: 7,
      } as Prouduct_Order);
      expect(createdprouduct_order).toEqual({
        id: createdprouduct_order.id,
        order_id: createdprouduct_order.order_id,
        product_id: createdprouduct_order.product_id,
        quantity: 7,
      } as Prouduct_Order);
    });

    it("expect addProductsInTheCurrentOrder to return products for order by order id", async () => {
      const Products = await orderModle.addProductsInTheCurrentOrder(order.id);
      expect(Products[0].id).toBe(product.id);
      expect(Products[0].name).toBe(product.name);
      expect(Products[0].price).toBe(product.price);
      expect(Products[0].category).toBe(product.category);
      expect(Products[0].quantity).toBe(prouduct_order.quantity);
    });

    it("expect deleteProductFromOrder method to return deleted prouduct_orders", async () => {
      const allprouduct_orders = await orderModle.deleteProductFromOrder(
        product.id,
        order.id
      );
      expect(allprouduct_orders.id).toBe(prouduct_order.id);
    });

    it("expect delete method to delet order form db and return deleted order", async () => {
      const deletedorder = await orderModle.delete(order.id as number);
      expect(deletedorder.id).toBe(order.id);
    });
  });
});
