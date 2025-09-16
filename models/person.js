require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [
      3,
      "Path name `({VALUE})` is shorter than the minimun allowed length (3)",
    ],
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{5,}$/.test(v);
      },
      message: (props) => `${props.value} it's not a valid phone number`,
    },
    required: [true, "User phone number required"],
  },

  // name: String,
  // number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
