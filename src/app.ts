import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Shop Assistent");
});

export default app;
