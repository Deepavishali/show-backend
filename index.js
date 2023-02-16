import * as dotenv from 'dotenv';
import cors from "cors";
import express, { request } from "express";
import { MongoClient } from "mongodb";
import { movierouter } from "./routes/movie.js";
import bcrypt from "bcrypt";
import { userRouter } from './routes/user.js';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is conected😎");
    return client;
}

export const client = await createConnection();

//interceptor => converting body to json
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Everyone🥳🥳 This is deepa vishali");
});


//setting routes//
app.use("/movie", movierouter);

app.use("/user", userRouter);

//PORT//
app.listen(PORT, () => console.log("Server started on PORT", PORT));