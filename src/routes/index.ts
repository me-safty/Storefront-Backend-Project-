import express, { Request, Response, Router } from "express";
import users from "./api/users.routes";
import products from "./api/products.routes";
import orders from "./api/orders.routes";

const routes: Router = express.Router();

routes.get("/", (_req: Request, res: Response) => {
  res.json({
    mwssage: "this is main route",
  });
});

routes.use("/users", users);
routes.use("/products", products);
routes.use("/orders", orders);

export default routes;
