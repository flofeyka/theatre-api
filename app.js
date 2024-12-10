import "dotenv/config";
import express from "express";
import sequelize from "./models/db.js";
import { authRouter } from "./routes/auth-router.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import { userRouter } from "./routes/user-router.js";
import { repertoireRouter } from "./routes/repertoire-router.js";
import cors from "cors";
import { sessionRouter } from "./routes/session-router.js";
import { imageRouter } from "./routes/image-router.js";
import fileUpload from "express-fileupload";
import path from "path";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/repertoire", repertoireRouter);
app.use("/session", sessionRouter);
app.use("/image", imageRouter);
app.use(express.static("static"));

app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server listening on ${PORT} port`));
  } catch (e) {
    console.log(e);
  }
};

start();
