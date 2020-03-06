
//configurando o servidor
const express= require("express")
const server= express()


//configurar o servidor para apresentar arquivos estaticos
server.use(express.static('public'))



//habilitar o body do formulario
server.use(express.urlencoded({extended: true}))


//HABILITAR A CONXEÃO COM O BANCO DE DADOS
const Pool = require('pg').Pool
const db = new Pool({
user:'postgres',
password: '0000',
host:'localhost',
port: 5432,
database: 'doe'


})



//config a template engine

const nunjucks= require("nunjucks")
nunjucks.configure("./", {

    express: server,
    noCache: true,//boolean ou booleano aceita 2 valores, verdadeiro ou falso
})






//configurar a apresentação da pagina
server.get("/", function(req, res){



    db.query("select * from donors", function(err, result){
        if (err) return res.send("Erro de banco de dados.")

        const donors= result.rows
        
      return res.render("index.html",{donors})

    })

})
    





server.post("/",function(req,res){
//PEGAR DADOS DO FORMULARIO
const name= req.body.name
const email= req.body.email
const blood= req.body.blood


   if (name=="" || email==""|| blood ==""){
return res.send("todos os campos são obrigatórios.")

}
//colocar valores dentro do banco de dados

const query =`
INSERT INTO donors ("name","email","blood") 
VALUES ($1,$2,$3)`

const values= [name,email,blood]


//fluxo de erro
db.query(query,values, function(err){
  if (err) return res.send("erro no banco de dados.")

 //fluxo correto
  return res.redirect("/")

})

})



/*ligar o servidor e permitir o acesso a porta 3000*/ 

server.listen(3000, function(){

console.log("iniciei o servidor")

})
