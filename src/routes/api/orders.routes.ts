import express, { Router } from "express";
import * as handlers from "../../handlers/orders.handler";
import validateToken from "../../middleware/Authentication.midlleware";

const orders: Router = express.Router();

orders.get("/", handlers.index);
orders.get("/:id", validateToken, handlers.show);
orders.get(
  "/Current_Order_By_User/:id",
  validateToken,
  handlers.CurrentOrderByUser
);
orders.get(
  "/Completed_Order_By_User/:id",
  validateToken,
  handlers.CompletedOrderByUser
);
orders.post("/", validateToken, handlers.create);
orders.post("/addProduct", validateToken, handlers.addProduct);
orders.put("/", validateToken, handlers.update);
orders.put(
  "/delete_Product_From_Order",
  validateToken,
  handlers.deleteProductFromOrder
);
orders.delete("/:id", validateToken, handlers.deletee);

export default orders;
