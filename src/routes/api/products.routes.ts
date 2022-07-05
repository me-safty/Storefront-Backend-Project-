import express, { Router } from "express";
import * as handlers from "../../handlers/products.handler";
import validateToken from "../../middleware/Authentication.midlleware";

const products: Router = express.Router();

products.post("/", validateToken, handlers.create);
products.get("/", handlers.index);
products.put("/", validateToken, handlers.update);
products.get("/:id", handlers.show);
products.get("/category/:category", handlers.productsByCategory);
products.delete("/:id", validateToken, handlers.deletee);

export default products;
