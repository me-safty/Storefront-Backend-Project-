import database from "../../database";
import UserModle from "../../models/users.model";
import app from "../../.";
import supertest from "supertest";
import User from "../../types/users.types";

const req = supertest(app);

const userModle = new UserModle();

let token = "";

describe("test user api endpoint", () => {
  const user = {
    first_name: "test",
    last_name: "test",
    password: "test123",
  } as User;

  beforeAll(async () => {
    const createdUser = await userModle.create(user);
    user.id = createdUser.id;
    token = (await userModle.authenticate(user)) as unknown as string;
  });

  afterAll(async () => {
    const con = await database.connect();
    const sql =
      "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await con.query(sql);
    con.release();
  });

  describe("test create method", () => {
    it("test create method to return new user with token", async () => {
      const res = await req
        .post("/api/users/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          first_name: "test2",
          last_name: "test2",
          password: "test2123",
        } as User);
      const { first_name, last_name } = res.body;
      expect(res.status).toBe(200);
      expect(first_name).toBe("test2");
      expect(last_name).toBe("test2");
    });

    it("test create method without firs_name, password expect status to be 400", async () => {
      await req
        .post("/api/users/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          last_name: "test2",
        } as User)
        .expect(400);
    });
  });

  describe("test index method", () => {
    it("expect index method to return all users", async () => {
      const res = await req
        .get("/api/users/")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });
  describe("test show method", () => {
    it("expect show method to return users by id", async () => {
      const res = await req
        .get(`/api/users/${user.id}`)
        .set("Authorization", `Bearer ${token}`);
      const { id, first_name, last_name } = res.body;
      expect(res.status).toBe(200);
      expect(id).toBe(user.id);
      expect(first_name).toBe(user.first_name);
      expect(last_name).toBe(user.last_name);
    });

    it("expect show method with not exist user id to 404", async () => {
      await req
        .get("/api/users/10")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });

  describe("test update method", () => {
    it("test update method to return updated user", async () => {
      const res = await req
        .put("/api/users/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: user.id,
          first_name: "testupdate",
          last_name: "test2update",
          password: "updatedtest2123",
        } as User);
      const { id, first_name, last_name } = res.body;
      expect(res.status).toBe(200);
      expect(id).toBe(user.id);
      expect(first_name).toBe("testupdate");
      expect(last_name).toBe("test2update");
    });

    it("test update method without id, first_name to return 400", async () => {
      await req
        .put("/api/users/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          last_name: "test2update",
          password: "updatedtest2123",
        } as User)
        .expect(400);
    });

    it("test update method with not exist user id to return 404", async () => {
      await req
        .put("/api/users/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: 10,
          first_name: "testupdate",
          last_name: "test2update",
          password: "updatedtest2123",
        } as User)
        .expect(404);
    });
  });

  describe("test delete method", () => {
    it("expect delete method to delete user by id and return deleted user", async () => {
      const res = await req
        .delete(`/api/users/${user.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(user.id);
    });

    it("expect delete method with not exist user id to 404", async () => {
      await req
        .delete("/api/users/10")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });
});
