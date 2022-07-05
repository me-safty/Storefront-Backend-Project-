import database from "../database";
import Order from "../types/orders.type";
import Prouduct_Order from "../types/prouduct_order.type";
import Product from "../types/products.type";

class OrderModle {
  //create
  async create(o: Order): Promise<Order> {
    try {
      const con = await database.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING id, user_id, status;";
      // i put the order status active as default becasue the order is created and it can change by "update order" method
      const Order = await con.query(sql, [o.user_id, "active"]);
      con.release();
      return Order.rows[0];
    } catch (error) {
      throw new Error(`can not create Order at err :${error as Error}`);
    }
  }
  //index
  async index(): Promise<Order[]> {
    try {
      const con = await database.connect();
      const sql = "SELECT * FROM orders;";
      const Orders = await con.query(sql);
      con.release();
      return Orders.rows;
    } catch (error) {
      throw new Error(`can not get all Orders at err :${error as Error}`);
    }
  }
  //show
  async show(id: number): Promise<Order> {
    try {
      const con = await database.connect();
      const sql = "SELECT * FROM orders WHERE id=$1;";
      const Order = await con.query(sql, [id]);
      con.release();
      return Order.rows[0];
    } catch (error) {
      throw new Error(
        `can not get Order where id is: ${id} at err :${error as Error}`
      );
    }
  }
  //update
  async update(o: Order): Promise<Order> {
    try {
      const con = await database.connect();
      const sql =
        "UPDATE orders SET user_id = $1, status = $2  WHERE id=$3 RETURNING id, user_id, status;";
      const Order = await con.query(sql, [o.user_id, o.status, o.id]);
      con.release();
      return Order.rows[0];
    } catch (error) {
      throw new Error(
        `can not update Order where id is: ${o.id} at err :${error as Error}`
      );
    }
  }
  //delete
  async delete(id: number): Promise<Order> {
    try {
      const con = await database.connect();
      const sql =
        "DELETE FROM orders WHERE id=$1 RETURNING id, user_id, status;";
      const Order = await con.query(sql, [id]);
      con.release();
      return Order.rows[0];
    } catch (error) {
      throw new Error(
        `can not delete Order where id is: ${id} at err :${error as Error}`
      );
    }
  }
  //Current Order by user
  async CurrentOrderByUser(id: number): Promise<Order> {
    try {
      const con = await database.connect();
      const sql = "SELECT * FROM orders WHERE user_id=$1;";
      const Order = await con.query(sql, [id]);
      con.release();
      return Order.rows[0];
    } catch (error) {
      throw new Error(
        `can not get Order where user_id is: ${id} at err :${error as Error}`
      );
    }
  }
  //Completed Orders by user
  async CompletedOrderByUser(id: number): Promise<Order> {
    try {
      const con = await database.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id=$1 AND status='complete';";
      const Order = await con.query(sql, [id]);
      con.release();
      return Order.rows[0];
    } catch (error) {
      throw new Error(
        `can not get Completed Orders where user_id is: ${id} at err :${
          error as Error
        }`
      );
    }
  }
  // add product
  async addProduct(po: Prouduct_Order): Promise<Prouduct_Order> {
    try {
      const con = await database.connect();
      const sql =
        "INSERT INTO prouduct_order (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING id, order_id, product_id, quantity;";
      const prouduct_order = await con.query(sql, [
        po.order_id,
        po.product_id,
        po.quantity,
      ]);
      con.release();
      return prouduct_order.rows[0];
    } catch (error) {
      throw new Error(
        `can not create prouduct_order at err :${error as Error}`
      );
    }
  }
  //deleteProductFromOrder
  async deleteProductFromOrder(
    product_id: number,
    order_id: number
  ): Promise<Prouduct_Order> {
    try {
      const con = await database.connect();
      const sql =
        "DELETE FROM prouduct_order WHERE product_id=$1 AND order_id=$2 RETURNING id, order_id, product_id, quantity;";
      const prouduct_order = await con.query(sql, [product_id, order_id]);
      con.release();
      return prouduct_order.rows[0];
    } catch (error) {
      throw new Error(
        `can not delete prouduct_order at err :${error as Error}`
      );
    }
  }
  // addProductsInTheCurrentOrder
  async addProductsInTheCurrentOrder(id: number): Promise<Product[]> {
    try {
      const con = await database.connect();
      const sql1 =
        "SELECT product_id, quantity FROM prouduct_order WHERE order_id=$1;";
      const prouducts_id = await con.query(sql1, [id]);
      const prouducts: Product[] = [];
      for (let i = 0; i < prouducts_id.rows.length; i++) {
        const sql = "SELECT * FROM products WHERE id=$1;";
        const product = await con.query(sql, [prouducts_id.rows[i].product_id]);
        prouducts.push({
          ...(product.rows[0] as unknown as Product),
          quantity: prouducts_id.rows[i].quantity as unknown as number,
        });
      }
      con.release();
      return prouducts;
    } catch (error) {
      throw new Error(
        `can not get prouduct_order at id ${id} at err :${error as Error}`
      );
    }
  }
}

export default OrderModle;
