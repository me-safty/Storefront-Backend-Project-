import database from "../database";
import Products from "../types/products.type";

class ProductsModil {
  //create
  async create(p: Products): Promise<Products> {
    try {
      const con = await database.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING id, name, price, category;";
      const product = await con.query(sql, [p.name, p.price, p.category]);
      con.release();
      return product.rows[0];
    } catch (error) {
      throw new Error(`can not create product at err :${error as Error}`);
    }
  }
  //index
  async index(): Promise<Products[]> {
    try {
      const con = await database.connect();
      const sql = "SELECT * FROM products";
      const products = await con.query(sql);
      con.release();
      return products.rows;
    } catch (error) {
      throw new Error(`can not get products at err :${error as Error}`);
    }
  }
  //show
  async show(id: number): Promise<Products> {
    try {
      const con = await database.connect();
      const sql = "SELECT * FROM products WHERE id=$1";
      const product = await con.query(sql, [id]);
      con.release();
      return product.rows[0];
    } catch (error) {
      throw new Error(
        `can not get product where id: ${id} at err :${error as Error}`
      );
    }
  }
  //update
  async update(p: Products): Promise<Products> {
    try {
      const con = await database.connect();
      const sql =
        "UPDATE products SET name = $1, price = $2, category = $3 WHERE id=$4 RETURNING id, name, price, category";
      const product = await con.query(sql, [p.name, p.price, p.category, p.id]);
      con.release();
      return product.rows[0];
    } catch (error) {
      throw new Error(
        `can not update product where id: ${p.id} at err :${error as Error}`
      );
    }
  }
  //delete
  async delete(id: number): Promise<Products> {
    try {
      const con = await database.connect();
      const sql =
        "DELETE FROM products WHERE id=$1 RETURNING id, name, price, category";
      const product = await con.query(sql, [id]);
      con.release();
      return product.rows[0];
    } catch (error) {
      throw new Error(
        `can not delete product where id: ${id} at err :${error as Error}`
      );
    }
  }
  //Products by category
  async productsByCategory(category: string): Promise<Products[]> {
    try {
      const con = await database.connect();
      const sql = "SELECT * FROM products WHERE category=$1";
      const product = await con.query(sql, [category]);
      con.release();
      return product.rows;
    } catch (error) {
      throw new Error(
        `can not get product where category is: ${category} at err :${
          error as Error
        }`
      );
    }
  }
}

export default ProductsModil;
