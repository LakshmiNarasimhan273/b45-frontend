const express = require("express");
require("dotenv").config();

const dbConnection = require("./config/dbConnection");
const taskRoutes = require("./routes/tasks.route");
const userRoutes = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/auth", userRoutes);

dbConnection();
app.listen(process.env.port, () => {
    console.log(`Server up and running on ${process.env.port}`);
});