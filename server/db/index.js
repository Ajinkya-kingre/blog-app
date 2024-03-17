const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://ajinkyavk143:rudyeris1234@cluster0.4kw5wxu.mongodb.net/"
  )
  .then(() => console.log("Connected mongo db"))
  .catch((e) => console.log(e));
