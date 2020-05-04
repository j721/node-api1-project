const express = require("express");
const shortid = require("shortid");
const server = express();

server.use(express.json());

let users = [
  {
    id: shortid.generate(),
    name: "Joe Smith",
    bio: "Frontend Developer",
  },
  {
    id: shortid.generate(),
    name: "Violet Rose",
    bio: "UX Designer",
  },
  {
    id: shortid.generate(),
    name: "Mark Red",
    bio: "Backend Developer",
  },
];

function getUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

server.get("/", (req, res) => {
  res.json({ api: "api is working!" });
});

server.get("/api/users", function (req, res) {
  //returns an array of users (id, name, bio)
  res.json(users);
});

function createUser(data) {
  const payload = {
    id: shortid.generate(),
    ...data,
  };

  users.push(payload);
  return payload;
}

server.post("/api/users", function (req, res) {

    if(!req.body.name || !req.body.bio){
        res.status(400).json({errorMessage: "Please provide name and bio"})
    }

  const userInformation = createUser({
        id: shortid.generate(), 
        name: req.body.name,
      bio: req.body.bio,
  })
  
//   req.body;

  users.push(userInformation);

  res.status(201).json(userInformation);
});

server.delete("/api/users/:id", function (req, res) {
  const id = Number(req.params.id);

  users = users.filter((user) => user.id !== id);

  res.status(200).json(users);
});

server.listen(8000, () => console.log("\n==API is up==\n"));
