const mongoose = require("mongoose");

const Blog = require("../model/Blog");

// Fetching the Blog Lists
const fetchListOfBlogs = async (req, res) => {
  let blogList;

  try {
    blogList = await Blog.find();
  } catch (error) {
    console.log(error);
  }

  if (!blogList) {
    return res.status(404).json({ message: "No Blogs Found!" });
  }

  return res.status(200).json({ blogList });
};

// Adding the new Blog
const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currDate = new Date();

  const newlyCreateBlog = new Blog({
    title,
    description,
    date: currDate,
  });

  try {
    await newlyCreateBlog.save();
  } catch (error) {
    console.log(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreateBlog.save(session);
    session.commitTransaction();
  } catch (error) {
    return res.send(500).json({ message: error });
  }

  return res.status(200).json({ newlyCreateBlog });
};

// Delelting a Blog
const deleteABlog = async (req, res) => {
  const id = req.params.id;

  try {
    const findCurrBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrBlog) {
      return res.status(404).json({ message: "NO Blog Found!" });
    }

    return res.status(200).json({ message: "Succesfully Deleted!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Unable to delete! Please try again!!" });
  }
};

// for Updating a Blog
const updageABlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  let currBlogToUpdate;
  try {
    currBlogToUpdate = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });
  } catch (error) {
    console.log(error);

    return (
      res.status(500),
      json({
        message: "Something went Wrong while Updating! Please try agin!!",
      })
    );
  }

  if (!currBlogToUpdate) {
    return res.status(500).json({ message: "unable to Update" });
  }

  return res.status(200).json({ currBlogToUpdate });
};

module.exports = { fetchListOfBlogs, addNewBlog, deleteABlog, updageABlog };
