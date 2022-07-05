import UserModle from "../models/users.model";
import { Request, Response } from "express";
import config from "../config";
import jwt from "jsonwebtoken";

const userModle = new UserModle();

export const create = async (req: Request, res: Response) => {
  try {
    // check all inputs it exists
    if (!req.body.first_name || !req.body.last_name || !req.body.password) {
      return res
        .status(400)
        .send("Bad request, please add first_name, last_name, password");
    }
    const user = await userModle.create(req.body);
    const token = jwt.sign({ user }, config.token as unknown as string);
    res.json({ ...user, token });
  } catch (error) {
    console.log(error);
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const users = await userModle.index();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    // check the id is valid or not
    const users = await userModle.index();
    let counter = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == (req.params.id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the user that you are locking for is not found, please try another id"
        );
    }
    counter = 0;
    const user = await userModle.show(req.params.id as unknown as number);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    // check all inputs it exists
    if (
      !req.body.first_name ||
      !req.body.last_name ||
      !req.body.password ||
      !req.body.id
    ) {
      return res
        .status(400)
        .send("Bad request, please add id, first_name, last_name, password");
    }
    // check the id is valid or not
    const users = await userModle.index();
    let counter = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == (req.body.id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the user that you are locking for is not found, please try another id"
        );
    }
    counter = 0;
    const user = await userModle.update(req.body);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const deletee = async (req: Request, res: Response) => {
  try {
    // check the id is valid or not
    const users = await userModle.index();
    let counter = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == (req.params.id as unknown as number)) {
        counter++;
      }
    }
    if (counter === 0) {
      return res
        .status(404)
        .send(
          "the user that you are locking for is not found, please try another id"
        );
    }
    counter = 0;
    const user = await userModle.delete(req.params.id as unknown as number);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
