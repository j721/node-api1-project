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

// function getUserById(id) {
//   return users.find((user) => user.id === id);
// }



server.get("/", (req, res) => {
  res.json({ api: "api is working!" });
});

server.get("/api/users", function (req, res) {
  //returns an array of users (id, name, bio)
  if(users){
      res.json(users);
  }else{
    res.status(500).json({errorMessage: "The users information could not be retrieved."})
  }
});

server.get('/api/users/:id', (req,res)=>{
    const id = req.params.id; 
    //filter method to find user from array
    let [ user ] = users.filter(username =>username.id === id);

    if(user){
        res.status(201).json(user);
    }else if (!user){
        res.status(404).json({errorMessage: "The user with the specified ID does not exist. "})
    }else{
        res.status(500).json({errorMessage:"The user information could not be retrieved."})
    }

})




function createUser(data) {
  const payload = {
    id: shortid.generate(),
    ...data,
  };

  users.push(payload);
  return payload;
}

//post
server.post("/api/users", function (req, res) {
  const userInformation = createUser({
    id: shortid.generate(),
    name: req.body.name,
    bio: req.body.bio,
  });

  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (userInformation) {
    res.status(201).json(userInformation);
    users.push(userInformation);
  } else {
      res.status(500).json({errorMessage: "There was an error while saving the user to the database."})
  }
});

//delete

server.delete("/api/users/:id", function (req, res) {
  const id = Number(req.params.id);

  users = users.filter((user) => user.id !== id);

  if(!users){
      res.status(404).json({errorMessage: "The user with the specified ID does not exist. "})
  }else{

      res.status(200).json(users);
  }
});

//put

server.put("/api/users/:id:", (req, res)=>{
    const id = req.params.id;
    const updated = req.body;
    //find specified user from an array
    const user = users.find(name=>name.id === id);

    if(user){
        if(updated.name && updated.bio){
            Object.assign(user, update)
            res.status(200).json(user)
        }else{
            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        }
    }else if(!user){
        res.statusMessage(404).json({errorMessage:"The user with the specified ID does not exist."})
    }else{
        res.status(500).json({errorMessage: "The user information could not be modified."})
    }


    // if(!user){
    //     res.statusMessage(404).json({errorMessage:"The user with the specified ID does not exist."})
    // }else if (!name || !bio){
    //     res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    // }else{
    //     user.name = name;
    //     user.bio = bio;
    //     res.status(200).json(user);
    // }

} )

//patch

server.patch("/api/users/:id:", (req, res)=>{
    const id = req.params.id;
    const updated = req.body;
    const user = users.find(name=>name.id === id);

    if(user){
        Object.assign(user, update)
        res.status(201).json(user)
    }else if (!user){
        res.status(404).json({errorMessage:"The user with the specified ID does not exist."})
    }else{
        res.status(500).json(errorMessage)
    }

})

server.listen(8000, () => console.log("\n==API is up==\n"));
