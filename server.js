const express= require("express");
const server= express();
const knex = require('./Database/connection');
server.use(express.static('public'))
server.use(express.urlencoded({extended: true}))


const nunjucks= require("nunjucks")
nunjucks.configure("./", {
  
  express: server,
  noCache: true,
})


server.get("/", async function(req, res){
  
  
    const donors= await knex('donors').select('*');
    
    return res.render("index.html",{donors})
    
})



server.post("/", async function(req,res){
  
  const {name, email, blood} = req.body;
  
  const donors = {
    name,
    email,
    blood
  };
  
  if (name=="" || email==""|| blood ==""){
    return res.send("todos os campos são obrigatórios.")
    
  }
  
  await knex('donors').insert(donors);
    
    return res.redirect("/")
  
  
})

server.listen(process.env.PORT || 3000, ()=>{
  
  console.log("server is on at 3000 port 🚪")
  
})
