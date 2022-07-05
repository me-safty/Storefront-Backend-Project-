import database from "../../database";
import app from "../../.";
import supertest from "supertest";
import UserModel from "../../models/users.model";
import OrderModle from "../../models/orders.model";
import Prouduct_Order from "../../types/prouduct_order.type";
import User from "../../types/users.types";
import ProductModle from "../../models/products.model";
import Order from "../../types/orders.type";
import Product from "../../types/products.type";

const productModle = new ProductModle();
const userModle = new UserModel();
const orderModle = new OrderModle();

const req = supertest(app);

let token = "";

describe("test orders api endpoint", () => {
  const user = {
    first_name: "test",
    last_name: "test",
    password: "test123",
  } as User;

  const user2 = {
    first_name: "test2",
    last_name: "test2",
    password: "test2123",
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
    token = (await userModle.authenticate(user)) as unknown as string;

    const createdUser2 = await userModle.create(user2);
    user2.id = createdUser2.id;
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

  describe("test create method", () => {
    it("test create method to return new order with token", async () => {
      const res = await req
        .post("/api/orders/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: user2.id,
        } as Order)
        .expect(200);
      const { user_id, status } = res.body;
      expect(user_id).toBe(user2.id);
      expect(status).toBe("active");
    });

    it("test create method without user_id expect status to be 400", async () => {
      await req
        .post("/api/orders/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({} as Order)
        .expect(400);
    });
  });

  describe("test index method", () => {
    it("expect index method to return all orders", async () => {
      const res = await req
        .get("/api/orders/")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe("test show method", () => {
    it("expect show method to return order by id", async () => {
      const res = await req
        .get(`/api/orders/${order.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      const { id, user_id, status, products } = res.body;
      expect(id).toBe(order.id);
      expect(user_id).toBe(order.user_id);
      expect(status).toBe(order.status);
      expect(products[0].id).toBe(product.id);
      expect(products[0].name).toBe(product.name);
      expect(products[0].price).toBe(product.price);
      expect(products[0].category).toBe(product.category);
      expect(products[0].quantity).toBe(prouduct_order.quantity);
    });

    it("expect show method with not exist order id to 404", async () => {
      await req
        .get("/api/orders/10")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });

  describe("test update method", () => {
    it("test update method to return updated order", async () => {
      const res = await req
        .put("/api/orders/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: order.id,
          user_id: user.id,
          status: "complete",
        } as Order)
        .expect(200);
      const { id, user_id, status } = res.body;
      expect(id).toBe(order.id);
      expect(user_id).toBe(order.user_id);
      expect(status).toBe("complete");
    });

    it("test update method without user_id to return 400", async () => {
      await req
        .put("/api/orders/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: order.id,
          status: "complete",
        } as Order)
        .expect(400);
    });

    it("test update method with not exist order id to return 404", async () => {
      await req
        .put("/api/orders/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: 10,
          user_id: user.id,
          status: "complete",
        } as Order)
        .expect(404);
    });
  });

  describe("test CurrentOrderByUser method", () => {
    it("expect CurrentOrderByUser method to return order by user", async () => {
      const res = await req
        .get(`/api/orders/Current_Order_By_User/${user.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      const { id, user_id, status, products } = res.body;
      expect(id).toBe(order.id);
      expect(user_id).toBe(user.id);
      expect(status).toBe("complete");
      expect(products[0].id).toBe(product.id);
      expect(products[0].name).toBe(product.name);
      expect(products[0].price).toBe(product.price);
      expect(products[0].category).toBe(product.category);
      expect(products[0].quantity).toBe(prouduct_order.quantity);
    });

    it("expect CurrentOrderByUser method with not exist user id to 404", async () => {
      await req
        .get("/api/orders/Current_Order_By_User/10")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });

  describe("test CompletedOrderByUser method", () => {
    it("expect CompletedOrderByUser method to return order by user", async () => {
      const res = await req
        .get(`/api/orders/Completed_Order_By_User/${user.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      const { id, user_id, status, products } = res.body;
      expect(id).toBe(order.id);
      expect(user_id).toBe(user.id);
      expect(status).toBe("complete");
      expect(products[0].id).toBe(product.id);
      expect(products[0].name).toBe(product.name);
      expect(products[0].price).toBe(product.price);
      expect(products[0].category).toBe(product.category);
      expect(products[0].quantity).toBe(prouduct_order.quantity);
    });

    it("expect CompletedOrderByUser method with not exist user id to 404", async () => {
      await req
        .get("/api/orders/Completed_Order_By_User/10")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });

  describe("test addProduct method", () => {
    it("expect addProduct method to return product_order", async () => {
      const res = await req
        .post("/api/orders/addProduct")
        .set("Authorization", `Bearer ${token}`)
        .send({
          order_id: 2,
          product_id: product.id,
          quantity: 5,
        } as Prouduct_Order)
        .expect(200);
      const { order_id, product_id, quantity } = res.body;
      expect(order_id).toBe(2);
      expect(product_id).toBe(product.id);
      expect(quantity).toBe(5);
    });

    it("expect addProduct method without order_id to be 400", async () => {
      await req
        .post("/api/orders/addProduct")
        .set("Authorization", `Bearer ${token}`)
        .send({
          product_id: product.id,
          quantity: 5,
        } as Prouduct_Order)
        .expect(400);
    });

    it("expect addProduct method with not exist order id to 404", async () => {
      await req
        .post("/api/orders/addProduct")
        .set("Authorization", `Bearer ${token}`)
        .send({
          order_id: 10,
          product_id: product.id,
          quantity: 5,
        } as Prouduct_Order)
        .expect(404);
    });
  });

  describe("test deleteProductFromOrder method", () => {
    it("expect deleteProductFromOrder method to return deleted prouduct_orders", async () => {
      const res = await req
        .put("/api/orders/delete_Product_From_Order")
        .set("Authorization", `Bearer ${token}`)
        .send({
          product_id: product.id,
          order_id: order.id,
        } as Prouduct_Order)
        .expect(200);
      expect(res.body.id).toBe(prouduct_order.id);
    });

    it("expect deleteProductFromOrder method without order id to 400", async () => {
      await req
        .put("/api/orders/delete_Product_From_Order")
        .set("Authorization", `Bearer ${token}`)
        .send({
          product_id: product.id,
        } as Prouduct_Order)
        .expect(400);
    });

    it("expect deleteProductFromOrder method with not exist order id to 404", async () => {
      await req
        .put("/api/orders/delete_Product_From_Order")
        .set("Authorization", `Bearer ${token}`)
        .send({
          product_id: product.id,
          order_id: 10,
        } as Prouduct_Order)
        .expect(404);
    });
  });

  describe("test delete method", () => {
    it("expect delete method to delete order by id and return deleted order", async () => {
      const res = await req
        .delete(`/api/orders/${order.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(res.body.id).toBe(order.id);
    });

    it("expect delete method with not exist order id to 404", async () => {
      await req
        .delete("/api/orders/10")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });
});
