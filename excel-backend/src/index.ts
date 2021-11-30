import express from "express";
import cors from "cors";

const app = express();
const port = 8080; // default port to listen

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Backend Online!");
});

app.post("/updateCell", (req, res) => {
    console.log(req.body)
    res.sendStatus(200);
});

// start the Express server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
