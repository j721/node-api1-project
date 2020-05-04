const express = require ("express");

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

server.listen (8000, ()=>console.log("\n==API is up==\n"))