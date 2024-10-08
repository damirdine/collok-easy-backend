import request from "supertest";
import server from "./utils";

const API_BASE_URL = "/api/v1";

let authToken = "";

describe("Tasks Controller", () => {
  test("Connexion", async () => {
    const response = await request(server)
      .post(API_BASE_URL + "/auth/login")
      .send({
        email: "user3@example.com",
        password: "your_password",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);

    authToken = response.body?.token;
  });

  test("should get tasks by colocation", async () => {
    const response = await request(server)
      .get(API_BASE_URL + "/colocation/1/tasks")
      .set("Authorization", `Bearer ${authToken}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("should add a new task", async () => {
    const response = await request(server)
      .post(API_BASE_URL + "/colocation/1/tasks")
      .send({
        name: "New Task",
        description: "Task description",
        deadline: "2024/12/31",
        estimated_duration: 5,
      })
      .set("Authorization", `Bearer ${authToken}`)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body?.data).toHaveProperty("id");
    expect(response.body?.data).toHaveProperty("estimated_duration", 5);
    expect(response.body?.data).toHaveProperty("objective");
  });
});
