const express = require('express');
const bcrypt = require('bcryptjs');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Sriram:Sri19%40tce@sandbox.mh7rlcf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    if(err){
        console.error(err);
        return;
    }
  const collection = client.db("milkway").collection("login");
  console.log("connected");
  client.close();
});


async function loginValidate(doc){
  //let { id, password } = doc;
  // doc["password"] = await bcrypt.hash(doc["password"]);
  console.log("readdy");
  console.log({"id":doc["id"], password:doc["password"]});
  console.log(await client.db("milkway").collection("login").find({"id":doc["id"], password:doc["password"]}).toArray());
   if((await client.db("milkway").collection("login").find(doc).toArray()).length === 1){
    console.log("validated");
      return true;
   }
   return false;

}



module.exports = {
  loginValidate
}