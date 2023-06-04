const express = require("express");
const swaggerUI = require("swagger-ui-express");
const fileUpload = require("express-fileupload");

const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");

const app = express();
app.use(fileUpload());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

let users = [
  {
    id: 1,
    name: "Tilak Dai",
  },
  {
    id: 2,
    name: "Santosh Dai",
  },
  {
    id: 3,
    name: "Bibas Dai",
  },
];

app.get("/string", (req, res) => {
  res.status(200).send("hawa sting xa yr");
});

app.get("/user", (req, res) => {
  res.status(200).send({
    id: 1,
    name: "Tilak Dai",
  });
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
  const obj = users.find((user) => user.id === parseInt(req.params.id));
  res.status(200).send(obj);
});

app.post("/create", (req, res) => {
  users = [req.body, ...users];
  res.send(users);
});

app.get("/usersQuery", (req, res) => {
  const obj = users.find((user) => user.id === parseInt(req.query.id));
  res.status(200).send(obj);
});

app.post("/upload", (req, res) => {
  console.log(req.headers);
  const file = req.files.file;
  let path = __dirname + "/upload" + "file" + Date.now() + ".jpg";
  file.mv(path, (err) => {
    res.send("OK");
  });
});

app.listen(4000, () => console.log("Running server at 4000"));
