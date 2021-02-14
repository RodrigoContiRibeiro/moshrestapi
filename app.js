const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

const isErr400 = function (req, res) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error != null) {
    res.status(400).send("ERROR 400, BAD REQUEST");
  }
};

// =======================HANDLERS==================

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (course != null) res.send(course);
  res.status(404).send("EROR 404, OBJECT NOT FOUND");
});

app.post("/api/courses", (req, res) => {
  isErr400(req, res);

  let course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  isErr400(req, res);

  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (course != null) {
    course.name = req.body.name;
    res.send(course);
  } else {
    res.status(404).send("EROR 404, OBJECT NOT FOUND");
  }
});

app.delete("/api/courses/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (course != null) {
    const index = courses.indexOf(course);
    courses.splice(index, 1)
    res.send(course)
  } else {
    res.status(404).send("EROR 404, OBJECT NOT FOUND");
  }
});

/* app.get("/api/posts/:year/:month", (req, res) => {
  res.send(JSON.stringify(req.params) + "\n" + JSON.stringify(req.query));
}); */

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening ${port}`));
