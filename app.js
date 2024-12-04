import 'dotenv/config';
import express from "express";
import sequelize from "./models/db.js";
import { authRouter } from "./routes/auth-router.js";
import errorMiddleware from './middlewares/error-middleware.js';
import { userRouter } from './routes/user-router.js';
import { repertoireRouter } from './routes/repertoire-router.js';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/repertoire", repertoireRouter)

app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: true});
        app.listen(PORT, () => console.log(`Server listening on ${PORT} port`))
    } catch(e) {
        console.log(e);
    }
}

start();