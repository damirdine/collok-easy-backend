import request from "supertest";
import server from "./utils";

const API_BASE_URL = "/api/v1";

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

let authToken = "";
let createdColocationId = null;

describe("authenticated", () => {
  test("Connexion", async () => {
    const response = await request(server)
      .post(API_BASE_URL + "/auth/login")
      .send({
        email: "user1@example.com",
        password: "your_password",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);

    authToken = response.body?.token;
  });
});

describe("getColocations", () => {
  test("should get a list of colocations", async () => {
    const response = await request(server)
      .get(API_BASE_URL + "/colocation")
      .set("Authorization", `Bearer ${authToken} `)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("createColocation", () => {
  test("should create a new colocation", async () => {
    const name = makeid(15);
    const colocationData = {
      name: name,
      admin_user_id: 1,
    };

    const response = await request(server)
      .post(API_BASE_URL + "/colocation")
      .set("Authorization", `Bearer ${authToken}`)
      .send(colocationData)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toHaveProperty("data");
    expect(response.body.data.name).toBe(colocationData.name);
    expect(response.body.data.admin_user_id).toBe(colocationData.admin_user_id);
    createdColocationId = response.body.data.id;
  });

  test("should delete the created colocation", async () => {
    if (!createdColocationId) {
      return;
    }

    const response = await request(server)
      .delete(`${API_BASE_URL}/colocation/${createdColocationId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Colocation supprimée avec succées");
  });

  test("should return 400 if data is invalid", async () => {
    const invalidColocationData = {
      name: "Nouvelle Colocation avec beaucoup trop de caractère pour provoquer une erreur 400",
      admin_user_id: 2,
    };

    const response = await request(server)
      .post(API_BASE_URL + "/colocation")
      .set("Authorization", `Bearer ${authToken}`)
      .send(invalidColocationData)
      .expect(400);

    expect(response.body).toHaveProperty("errors");
  });
});
