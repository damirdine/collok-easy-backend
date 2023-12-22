import request from "supertest";
import server from "./utils";

const API_BASE_URL = "/api/v1";
server.listen(3001);

let token;
describe("Authentication (Registration/Login)", () => {
  test("Registration)", async () => {
    const response = await request(server)
      .post(API_BASE_URL + "/auth/register")
      .send({
        firstname: "John",
        lastname: "Doe",
        email: "example@example.com",
        password: "your_password",
        birthday: "1990-01-01",
        phone: "1234567890",
        pseudo: "john_doe",
        gender: "male",
        avatar: "https://example.com/avatar.jpg",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
    token = response.body?.token;
  });
  test("Login", async () => {
    const response = await request(server)
      .post(API_BASE_URL + "/auth/login")
      .send({
        email: "example@example.com",
        password: "your_password",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    token = response.body?.token;
  });
});

describe("User profile", () => {
  test("Edit profile", async () => {
    const firstname = "Firstname";
    const res = await request(server)
      .put(API_BASE_URL + "/users")
      .send({ firstname })
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res?.body?.data?.firstname).toEqual(firstname);
  });
  test("Delete profile", async () => {
    await request(server)
      .delete(API_BASE_URL + "/users")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
server.close();
