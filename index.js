const express = require ("express");
const db = require('./database');
const server = express(); 

server.use(express.json());

let users =[{
    id: 1, 
    name: "Joe Smith",
    bio: "Web Developer"
}];

server.get("/", (req, res)=>{
    res.json({api: "api is working!" })
})

server.get("/api/users", function (req, res){
    //returns an array of users (id, name, bio)
    res.json(users);
})

server.post("/api/users", function (req, res){
    const userInformation = req.body;

    users.push(userInformation);

    res.status(201).json(userInformation)

})

server.delete("/api/users/:id", function (req, res){
    const id = Number(req.params.id);

    users = users.filter(user=>user.id !==id)

    res.status(200).json(users);
})

server.listen (8000, ()=>console.log("\n==API is up==\n"))