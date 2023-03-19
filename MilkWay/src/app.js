const express = require('express');
const path = require('path');
const hbs = require("hbs");
const bodyparser = require("body-parser")
const { loginValidate } = require("./database.js")

const app = express();

const static_path = path.join(__dirname,"../public" );
const template_path = path.join(__dirname,"../templates/views" );

app.use(express.static(static_path ));
app.set("view engine","hbs")
app.set("views",template_path);
app.use(express.urlencoded({extended :false}))
app.use(bodyparser.json())


app.post("/login", async(req, res)=>{
    console.log(req.body["id"])
    if(req["body"]["id"]){
        if(await loginValidate(req["body"])){
          console.log("rendering");
            res.redirect("employer");
            return;
        }
        res.send({"state" : "false"});
    }
})

app.get("/",(req,res)=>{
  res.render("login");
})

app.get("/milkmen", (req, res)=>{
  res.render("Manager/milkmen")
})

app.get("/milkmen/details", (req, res)=>{
  res.render("Manager/details")
})

app.get("/milkmen/details/addMilkmen", (req, res)=>{
  res.render("Manager/addMilkmen");
})

app.get("/employer",(req,res)=>{
  res.render("manager/employer");
})



app.listen(9000, ()=>{
  console.log("Connected ");
})