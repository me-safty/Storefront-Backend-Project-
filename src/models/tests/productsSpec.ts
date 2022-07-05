import database from "../../database";
import ProductModle from "../products.model";
import Product from "../../types/products.type";

const productModle = new ProductModle();

describe("product modle", () => {
  describe("product methouds exists", () => {
    it("create product method exists", () => {
      expect(productModle.create).toBeDefined();
    });
    it("index product method exists", () => {
      expect(productModle.index).toBeDefined();
    });
    it("show product method exists", () => {
      expect(productModle.show).toBeDefined();
    });
    it("update product method exists", () => {
      expect(productModle.update).toBeDefined();
    });
    it("delete product method exists", () => {
      expect(productModle.delete).toBeDefined();
    });
    it("productsByCategory method exists", () => {
      expect(productModle.productsByCategory).toBeDefined();
    });
  });

  describe("product Modle Logic", () => {
    const product = {
      name: "test",
      price: 10,
      category: "categorytset",
    } as Product;

    beforeAll(async () => {
      const createdproduct = await productModle.create(product);
      product.id = createdproduct.id;
    });

    afterAll(async () => {
      const con = await database.connect();
      const sql =
        "DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;";
      await con.query(sql);
      con.release();
    });

    it("expect create method to return new product", async () => {
      const createdproduct = await productModle.create({
        name: "test2",
        price: 5,
        category: "categorytset",
      } as Product);
      expect(createdproduct).toEqual({
        id: createdproduct.id,
        name: "test2",
        price: 5,
        category: "categorytset",
      } as Product);
    });

    it("expect index method to return all products", async () => {
      const allproducts = await productModle.index();
      expect(allproducts.length).toBe(2);
    });

    it("expect show method to return expected product by id", async () => {
      const productById = await productModle.show(product.id as number);
      expect(productById.id).toBe(product.id);
      expect(productById.name).toBe(product.name);
      expect(productById.price).toBe(product.price);
      expect(productById.category).toBe(product.category);
    });

    it("expect update method to return updated product", async () => {
      const updatedproduct = await productModle.update({
        id: product.id,
        name: "testUpdate",
        price: 7,
        category: "categorytset",
      } as Product);
      expect(updatedproduct.id).toBe(product.id);
      expect(updatedproduct.name).toBe("testUpdate");
      expect(updatedproduct.price).toBe(7);
      expect(updatedproduct.category).toBe("categorytset");
    });

    it("expect productsByCategory method to return all products by category", async () => {
      const productsByCategory = await productModle.productsByCategory(
        product.category as string
      );
      expect(productsByCategory.length).toBe(2);
    });

    it("expect delete method to delet product form db and return deleted product", async () => {
      const deletedproduct = await productModle.delete(product.id as number);
      expect(deletedproduct.id).toBe(product.id);
    });
  });
});
