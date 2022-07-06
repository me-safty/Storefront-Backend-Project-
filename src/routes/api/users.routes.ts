import express, { Router } from "express";
import * as handlers from "../../handlers/users.handler";
import validateToken from "../../middleware/Authentication.midlleware";

const users: Router = express.Router();

users.post("/", handlers.create);
users.get("/", validateToken, handlers.index);
users.put("/", validateToken, handlers.update);
users.get("/:id", validateToken, handlers.show);
users.delete("/:id", validateToken, handlers.deletee);

export default users;
