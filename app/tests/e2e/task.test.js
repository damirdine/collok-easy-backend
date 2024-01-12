import request from "supertest";
import server from "./utils";

const API_BASE_URL = "/api/v1";

let authToken = "";

beforeAll(async () => {
  // Connectez-vous et obtenez le jeton d'authentification avant de commencer les tests
  const response = await request(server)
    .post(API_BASE_URL + "/auth/login")
    .send({
      email: "user3@example.com",
      password: "your_password",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);

  authToken = response.body?.token;
});

describe("Tasks Controller", () => {
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

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("estimated_duration", 5);
    expect(response.body).toHaveProperty("objective");
  });
});
