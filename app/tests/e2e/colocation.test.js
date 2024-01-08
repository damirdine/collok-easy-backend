import request from "supertest";
import server from "./utils";

const API_BASE_URL = "/api/v1";
server.listen(3002);

let authToken = "";

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
      .expect(200);

    authToken = response.body?.token;
    })
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

// describe("createColocation", () => {
//     test("should create a new colocation", async () => {
//     const colocationData = {
//         name: "Nouvelle Colocation",
//         admin_user_id: 1,
//     };

//     const response = await request(server)
//         .post(API_BASE_URL + "/colocation")
//         .set("Authorization", `Bearer ${authToken}`)
//         .send(colocationData)
//         .expect("Content-Type", /json/)
//         .expect(201);

    
//     expect(response.body).toHaveProperty("data");
//     expect(response.body.data.name).toBe(colocationData.name);
//     expect(response.body.data.admin_user_id).toBe(colocationData.admin_user_id);
//     });

//     test("should return 500 if data is invalid", async () => {
//     const invalidColocationData = {
//         // Données invalides pour provoquer une erreur
//     };

//     const response = await request(server)
//         .post(API_BASE_URL + "/colocations")
//         .set("Authorization", `Bearer ${authToken}`)
//         .send(invalidColocationData)
//         .expect("Content-Type", /json/)
//         .expect(500);

//       // Ajoute ici des assertions spécifiques à la réponse si nécessaire
//       expect(response.body).toHaveProperty("error");
//     });
//   });

server.close();