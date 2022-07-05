import database from "../database";
import User from "../types/users.types";
import bcrypt from "bcrypt";
import config from "../config";
import jwt from "jsonwebtoken";

const hashPass = (pass: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${pass}${config.bcrypt}`, salt);
};

class UserModle {
  //create
  async create(u: User): Promise<User> {
    try {
      const con = await database.connect();
      const sql =
        "INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING id, first_name, last_name;";
      const user = await con.query(sql, [
        u.first_name,
        u.last_name,
        hashPass(u.password),
      ]);
      con.release();
      return user.rows[0];
    } catch (error) {
      throw new Error(`can not create user at err :${error as Error}`);
    }
  }
  //index
  async index(): Promise<User[]> {
    try {
      const con = await database.connect();
      const sql = "SELECT id, first_name, last_name FROM users";
      const users = await con.query(sql);
      con.release();
      return users.rows;
    } catch (error) {
      throw new Error(`can not get all users at err :${error as Error}`);
    }
  }
  //show
  async show(id: number): Promise<User> {
    try {
      const con = await database.connect();
      const sql = "SELECT id, first_name, last_name FROM users WHERE id=$1";
      const user = await con.query(sql, [id]);
      con.release();
      return user.rows[0];
    } catch (error) {
      throw new Error(
        `can not get user by id: ${id} at err :${error as Error}`
      );
    }
  }
  //update
  async update(u: User): Promise<User> {
    try {
      const con = await database.connect();
      const sql =
        "UPDATE users SET first_name = $1, last_name = $2, password = $3 WHERE id=$4 RETURNING id, first_name, last_name";
      const user = await con.query(sql, [
        u.first_name,
        u.last_name,
        hashPass(u.password),
        u.id,
      ]);
      con.release();
      return user.rows[0];
    } catch (error) {
      throw new Error(
        `can not update user by id: ${u.id} at err :${error as Error}`
      );
    }
  }
  //delete
  async delete(id: number): Promise<User> {
    try {
      const con = await database.connect();
      const sql =
        "DELETE FROM users WHERE id=$1 RETURNING id, first_name, last_name";
      const user = await con.query(sql, [id]);
      con.release();
      return user.rows[0];
    } catch (error) {
      throw new Error(
        `can not delete user by id: ${id} at err :${error as Error}`
      );
    }
  }
  //authenticate
  async authenticate(u: User): Promise<string | null> {
    try {
      const con = await database.connect();
      const sql = "SELECT * FROM users WHERE first_name=$1 AND last_name=$2";
      const result = await con.query(sql, [u.first_name, u.last_name]);
      if (result.rows.length === 1) {
        const isPassValid = bcrypt.compareSync(
          `${u.password}${config.bcrypt}`,
          result.rows[0].password
        );
        if (isPassValid) {
          const token = jwt.sign(
            { ...result.rows[0] },
            config.token as unknown as string
          );
          return token;
        }
      }
      con.release;
      return null;
    } catch (e) {
      throw new Error(`err at ${(e as Error).message}`);
    }
  }
}

export default UserModle;
