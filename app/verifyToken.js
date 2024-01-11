
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./helpers/constant.js";

const tokenToVerify =

  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDQ4OTQ0NjcsImV4cCI6MTcwNDg5ODA2N30.8Eo_t3exTgRboqbAurt1mGUpiAcB5_rtWa1RPZa_BQ8";


jwt.verify(tokenToVerify, JWT_SECRET_KEY, (err, decoded) => {
  if (err) {
    console.error("Erreur de vérification du token :", err);
    // Le token est invalide
  } else {
    console.log("Token décodé :", decoded);
    // Le token est valide
  }
});

/*const user = {
  id: 1,
  firstName: "Elena",
  lastName: "Doe",
  email: "contact@example.com",
  password: "password",
  birthday: "1990-01-01",
  phone: "1234567890",
  pseudo: "john_doe",
  gender: "male",
  avatar: "https://example.com/avatar.jpg",
};

const token = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: "1h" });

console.log("Token généré :", token);*/

