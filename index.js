const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(cors());

//Middleware to log details of the request
// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };

morgan.token("info", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :info")
);
// app.use(requestLogger);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  const entries = persons.length;
  const time = new Date();

  res.send(
    `<p>Phonebook has info for ${entries} people</p>
    <p>${time}<p/>`
  );
});

//Get list of items
app.get("/api/persons/", (req, res) => {
  res.json(persons);
});

//Function to find person by id
const findId = (id) => {
  const person = persons.find((person) => person.id === id);
  return person;
};

//Get item by id
app.get("/api/persons/:id", (req, res) => {
  const person = findId(req.params.id);

  //Check if item is available or not
  if (person) {
    res.json(person);
  } else res.status(404).end();
});

//Delete item from persons list
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);

  console.log(res);
  res.status(204).end();
});

//Function to generate id
const generateID = () => {
  return persons.length > 0
    ? Math.max(...persons.map((n) => Number(n.id) * Math.random()))
    : 0;
};

//Post new item to persons list
app.post("/api/persons/", (request, res) => {
  const body = request.body;
  const checkName = persons.find((item) => item.name === body.name);

  if (!body.name) {
    return res.status(400).json({
      error: "Name missing",
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: "Number missing",
    });
  } else if (checkName) {
    return res.status(400).json({
      error: "Name already exists, it must be unique!",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  };

  persons = persons.concat(person);
  res.status(201).json(person);
});

//Middleware to check for unknown endpoints
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };

// app.use(unknownEndpoint);

//Listen for requests on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`);
});
