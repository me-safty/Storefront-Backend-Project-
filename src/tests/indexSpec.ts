import app from "..";
import supertest from "supertest";
import routes from "../.";

const req = supertest(app);

describe("test the main / endpoint", () => {
  it("expect status to be 200", async () => {
    const res = await req.get("/");
    expect(res.status).toBe(200);
  });
});

const req1 = supertest(routes);

describe("test the api endpoint", () => {
  it("expect status to be 200", async () => {
    const res = await req1.get("/api");
    expect(res.status).toBe(200);
  });
});
