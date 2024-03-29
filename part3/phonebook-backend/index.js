const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '));
morgan.token('body', (req, res) => JSON.stringify(req.body));

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

morgan.token('body', (req) => JSON.stringify(req.body));

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} persons</p> <p>${new Date()}</p>`);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({ error: "Name not found" });
  }
  if (!body.number) {
    return res.status(400).json({ error: "Number not found" });
  }
  if (persons.some(person => person.name === body.name)) {
    return res.status(400).json({ error: "Name already exists" });
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  };
  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});