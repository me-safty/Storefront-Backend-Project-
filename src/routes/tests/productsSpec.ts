import database from "../../database";
import app from "../../.";
import supertest from "supertest";
import UserModle from "../../models/users.model";
import User from "../../types/users.types";
import ProductModle from "../../models/products.model";
import Product from "../../types/products.type";

const req = supertest(app);

const userModle = new UserModle();

const productModle = new ProductModle();

let token = "";

describe("test product api endpoint", () => {
  const user = {
    first_name: "test",
    last_name: "test",
    password: "test123",
  } as User;

  const product = {
    name: "test",
    price: 10,
    category: "categorytset",
  } as Product;

  beforeAll(async () => {
    const createdUser = await userModle.create(user);
    user.id = createdUser.id;
    token = (await userModle.authenticate(user)) as unknown as string;
    const createdproduct = await productModle.create(product);
    product.id = createdproduct.id;
  });

  afterAll(async () => {
    const con = await database.connect();
    const sql =
      "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;";
    await con.query(sql);
    con.release();
  });
  describe("test create method", () => {
    it("test create method to return new product with token", async () => {
      const res = await req
        .post("/api/products/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "test2",
          price: 4,
          category: "testcategory",
        } as Product);
      const { name, price, category } = res.body;
      expect(res.status).toBe(200);
      expect(name).toBe("test2");
      expect(price).toBe(4);
      expect(category).toBe("testcategory");
    });

    it("test create method without name, price expect status to be 400", async () => {
      await req
        .post("/api/products/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          category: product.category,
        } as Product)
        .expect(400);
    });

    it("test create method with un authrize user expect status to be 401", async () => {
      await req
        .post("/api/products/")
        .set("Content-type", "application/json")
        .send({
          category: product.category,
        } as Product)
        .expect(401);
    });
  });

  describe("test index method", () => {
    it("expect index method to return all products", async () => {
      const res = await req
        .get("/api/products/")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe("test show method", () => {
    it("expect show method to return product by id", async () => {
      const res = await req
        .get(`/api/products/${product.id}`)
        .set("Authorization", `Bearer ${token}`);
      const { id, name, price, category } = res.body;
      expect(res.status).toBe(200);
      expect(id).toBe(product.id);
      expect(name).toBe(product.name);
      expect(price).toBe(product.price);
      expect(category).toBe(product.category);
    });
    it("expect show method with not exist product id to 404", async () => {
      await req
        .get("/api/products/10")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });

  describe("test update method", () => {
    it("test update method to return updated product", async () => {
      const res = await req
        .put("/api/products/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: product.id,
          name: "testupdate",
          price: 6,
          category: "updatedcategory",
        } as Product);
      const { id, name, price, category } = res.body;
      expect(res.status).toBe(200);
      expect(id).toBe(product.id);
      expect(name).toBe("testupdate");
      expect(price).toBe(6);
      expect(category).toBe("updatedcategory");
    });

    it("test update method without id, name to return 400", async () => {
      await req
        .put("/api/products/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          price: 6,
          category: "updatedcategory",
        } as Product)
        .expect(400);
    });

    it("test update method with not exist product id to return 404", async () => {
      await req
        .put("/api/products/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: 10,
          name: "testupdate",
          price: 6,
          category: "updatedcategory",
        } as Product)
        .expect(404);
    });
  });

  describe("test productsByCategory method", () => {
    it("expect productsByCategory method to return product", async () => {
      const res = await req
        .get("/api/products/category/updatedcategory")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body[0].id).toBe(product.id);
    });

    it("expect productsByCategory method with not exist product id to 404", async () => {
      await req
        .get("/api/products/category/elecric")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });

  describe("test delete method", () => {
    it("expect delete method to delete product by id and return deleted product", async () => {
      const res = await req
        .delete(`/api/products/${product.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(product.id);
    });

    it("expect delete method with not exist product id to 404", async () => {
      await req
        .delete("/api/products/10")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });
});
