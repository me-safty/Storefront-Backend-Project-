import { Request, Response, NextFunction } from "express";
import config from "../config";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHedaer = req.get("Authorization");
    if (authHedaer) {
      const bearer = authHedaer.split(" ")[0].toLowerCase();
      const token = authHedaer.split(" ")[1];
      if (bearer === "bearer") {
        const decode = jwt.verify(token, config.token as unknown as string);
        if (decode) {
          next();
        } else {
          const error: Error = new Error("login field, pleace try again");
          next(error);
        }
      } else {
        const error: Error = new Error("login field, pleace try again");
        next(error);
      }
    } else {
      const error: Error = new Error("login field, pleace try again");
      next(error);
    }
  } catch (err) {
    const error: Error = new Error("login field, pleace try again");
    next(error);
  }
};

export default validateToken;
