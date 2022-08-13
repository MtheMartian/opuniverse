const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;
const app = express();
const cors = require('cors');
require('dotenv').config();

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'opuniverse'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
      .then(client =>{
          console.log(`Connected to ${dbName} Database`);
          db = client.db(dbName);
      })


app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (request, response) =>{
  db.collection('opchar').find().toArray()
  .then(data =>{
    response.render('index.ejs', {info: data});
  })
  .catch(error => console.log(error));
})

app.post('/addChar', (request, response) =>{
  db.collection('opchar').insertOne({charName: request.body.charName,
  charAge: request.body.charAge, type: request.body.type, 
  imgURL: request.body.imgURL})
  .then(result =>{
    console.log('Character Added!');
    response.redirect('/');
  })
  .catch(error =>{
    console.log(`Something went wrong! ${error}`);
  })
})

app.put('/updateChar', (response, request) =>{
  db.collection('opchar').updateOne({charName: request.body.charName,
    charAge: request.body.charAge, type: request.body.type, 
    imgURL: request.body.imgURL})
    .then(result =>{
      console.log(`${result.charName} was updated!`);
      response.redirect('/');
    })
    .catch(error =>{
      console.log("Was unable to update!");
    })
})

app.listen(process.env.PORT || PORT, () =>{
  console.log(`Server is running on port ${PORT}`);
})