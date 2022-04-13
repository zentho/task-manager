const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const port = process.env.PORT || 3001;
const taskRoutes = require("./routes/taskRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/tasks", taskRoutes);

// Serve Frontend (under your api routes)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html")));
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server has started on port ${port}...`);
});
