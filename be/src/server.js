import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine.js";
import initWebRoute from "./route/web.js";
import connectDB from "./config/connectDB.js";
import cors from "cors";

require('dotenv').config();

let app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoute(app);

connectDB();

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});