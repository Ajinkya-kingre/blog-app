const express = require("express");
const cors = require("cors");
const blogRouter = require("./route/blog-route");

require("./db");

const app = express();
app.use(
  cors({
    origin: ["https://mern-f-blog-app.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use("/api", (req, res) => {
  res.send("Hello");
});

app.listen(5000, () => console.log("App is running at 5000"));
