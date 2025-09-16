require("dotenv").config();
const Person = require("./models/person");
const express = require("express");
const morgan = require("morgan");
//We don't need cors anymore since the static files are being served by the backend
const app = express();

morgan.token("info", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :info")
);

app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((result) => {
      const time = new Date();
      res.send(
        `<p>Phonebook has info for ${result} people</p>
    <p>${time}<p/>`
      );
    })
    .catch((error) => next(error));
});

// app.get("/", (req, res) => {
//   res.send("Hello, backend is working");
// });

//Get list of items - API endpoint for list of persons
app.get("/api/persons/", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

//Get item by id
app.get("/api/persons/:id", (req, res, next) => {
  // const person = findId(req.params.id);
  //   //Check if item is available or not
  //   if (person) {
  //     res.json(person);
  //   } else res.status(404).end();

  Person.findOne({ _id: req.params.id })
    .then((result) => {
      result ? res.json(result) : res.status(404).end();
    })
    .catch((error) => next(error));
});

//Delete item from persons list
app.delete("/api/persons/:id", (req, res, next) => {
  // const id = req.params.id;
  // persons = persons.filter((person) => person.id !== id);

  // console.log(res);
  // res.status(204).end();

  Person.findByIdAndDelete({ _id: req.params.id })
    .then((person) => {
      res.status(202).json(person);
    })
    .catch((error) => next(error));
});

//Find and update item by id
app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;
  if (!number) {
    res.status(400).json({ error: "Number missing" });
  }

  const update = { name, number };

  Person.findByIdAndUpdate(req.params.id, update, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => next(error));
});

//Post new item to persons list
app.post("/api/persons/", (req, res, next) => {
  const body = req.body;
  // const checkName = persons.find((item) => item.name === body.name);
  // const checkName = Person.exists({ name: body.name });

  // if (!body.name) {
  //   return res.status(400).json({
  //     error: "Name missing",
  //   });
  // } else if (!body.number) {
  //   return res.status(400).json({
  //     error: "Number missing",
  //   });
  // } else if (checkName) {
  //   console.log(checkName);
  //   return res.status(400).json({
  //     error: "Name already exists, it must be unique!",
  //   });
  // }

  // const person = {
  //   name: body.name,
  //   number: body.number,
  //   id: generateID(),
  // };

  // persons = persons.concat(person);
  // res.status(201).json(person);

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      next(error);
    });
});

//Unknown endpoints middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

//Error handling middleware
const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

//Listen for requests on port 3001
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`);
});
