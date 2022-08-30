import express from "express";
import dotenv from "dotenv";

import Connection from "./database/mongodb.js";
import DefaultData from "./defaultdata.js";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 8000;

dotenv.config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME, PASSWORD);

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

// app.post("/signup", (req, res) => userSignUp());

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT} Port`);
});

DefaultData();
