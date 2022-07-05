import database from "../../database";
import UserModel from "../users.model";
import User from "../../types/users.types";

const userModle = new UserModel();

describe("user modle", () => {
  describe("user methouds exists", () => {
    it("create user method exists", () => {
      expect(userModle.create).toBeDefined();
    });
    it("index user method exists", () => {
      expect(userModle.index).toBeDefined();
    });
    it("show user method exists", () => {
      expect(userModle.show).toBeDefined();
    });
    it("update user method exists", () => {
      expect(userModle.update).toBeDefined();
    });
    it("delete user method exists", () => {
      expect(userModle.delete).toBeDefined();
    });
    it("authenticate user method exists", () => {
      expect(userModle.authenticate).toBeDefined();
    });
  });

  describe("User Modle Logic", () => {
    const user = {
      first_name: "test",
      last_name: "test",
      password: "test123",
    } as User;

    beforeAll(async () => {
      const createdUser = await userModle.create(user);
      user.id = createdUser.id;
    });

    afterAll(async () => {
      const con = await database.connect();
      const sql =
        "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;";
      await con.query(sql);
      con.release();
    });

    it("expect create method to return new user", async () => {
      const createdUser = await userModle.create({
        first_name: "test2",
        last_name: "test2",
        password: "test123",
      } as User);
      expect(createdUser).toEqual({
        id: createdUser.id,
        first_name: "test2",
        last_name: "test2",
      } as User);
    });

    it("expect index method to return all users", async () => {
      const allUsers = await userModle.index();
      expect(allUsers.length).toBe(2);
    });

    it("expect show method to return expected user by id", async () => {
      const userById = await userModle.show(user.id as number);
      expect(userById.id).toBe(user.id);
      expect(userById.first_name).toBe(user.first_name);
      expect(userById.last_name).toBe(user.last_name);
    });

    it("expect update method to return updated user", async () => {
      const updatedUser = await userModle.update({
        id: user.id,
        first_name: "testUpdate",
        last_name: "testUpdate",
        password: user.password,
      } as User);
      expect(updatedUser.id).toBe(user.id);
      expect(updatedUser.first_name).toBe("testUpdate");
      expect(updatedUser.last_name).toBe("testUpdate");
    });

    it("expect delete method to delet user form db and return deleted user", async () => {
      const deletedUser = await userModle.delete(user.id as number);
      expect(deletedUser.id).toBe(user.id);
    });
  });
});
