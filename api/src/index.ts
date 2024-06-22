import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());

app.get("/share", (req, res) => {
  res.json({
    share: process.env.SHARE,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
