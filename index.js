const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
const bodyParser =require('body-parser');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 4500;
app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
 
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9e8bh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const foodCollection = client.db("bioFood").collection("foods");
   
console.log('database connection success')

  });
  








  app.listen(port, () => {
    console.log("Hello")
  })
  