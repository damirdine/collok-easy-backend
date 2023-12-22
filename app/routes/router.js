import express from "express";
import userController from "../controllers/usersController.js";
import authMiddleware from "../middleware/auth.js";
import authRouter from "./auth.js";
import outgoingRouter from "./outgoing.js";
import taskRouter from "./task.js";
import colocationRouter from "./colocation.js";
import userRouter from "./user.js";

const apiV1Router = express.Router();

// Authentication and User management
apiV1Router.use("/auth", authRouter);

// user
apiV1Router.get("/me", authMiddleware, userController.me);
apiV1Router.use("/profile", authMiddleware, userRouter);

//Colocation routes
apiV1Router.use("/colocation", authMiddleware, outgoingRouter);
apiV1Router.use("/colocation", authMiddleware, taskRouter);
apiV1Router.use("/colocation", colocationRouter);

export default apiV1Router;
