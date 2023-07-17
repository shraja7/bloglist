require("dotenv").config();
const connectToDatabase = require("./app");
const express = require("express");
const cors = require("cors");
const Blog = require("./models/blog");

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving blogs from the database" });
  }
});

app.post("/api/blogs", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: "Error saving the blog to the database" });
  }
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database:", error);
  });
