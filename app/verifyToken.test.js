import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./helpers/constant.js";

const tokenToVerify =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMDhUMTA6NDc6NTEuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDEtMDhUMTA6NDc6NTEuMDAwWiIsImZpcnN0bmFtZSI6IkVsZW5hIiwibGFzdG5hbWUiOiJEb2UiLCJlbWFpbCI6ImNvY29AZXhhbXBsZS5jb20iLCJiaXJ0aGRheSI6IjE5OTAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsInBob25lIjoiMTIzNDU2Nzg5MCIsInBzZXVkbyI6ImpvaG5fZG9lIiwiZ2VuZGVyIjoibWFsZSIsImF2YXRhciI6Imh0dHBzOi8vZXhhbXBsZS5jb20vYXZhdGFyLmpwZyIsImNvbG9jYXRpb25faWQiOjEsImlhdCI6MTcwNDg3OTU0OCwiZXhwIjoxNzA0ODgzMTQ4fQ.wfUtVFzo03mKwjmUCQnqlNzm_oKEFuMCyJSTaxqYBBg";

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
