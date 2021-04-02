const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
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

   
    app.get('/foods', (req, res) =>{
      foodCollection.find({email: req.query.email})
      .toArray( (err, documents)=>{
        res.send(documents);
      })
    })

    app.get('/food/:id', (req, res)=>{
      foodCollection.find({_id: ObjectId(req.params.id)})
      .toArray( (err, documents)=> {
          res.send(documents[0]);
      })
  })
  
  app.delete('/delete/:id', (req, res)=>{
      console.log(req.params.id);
   foodCollection.deleteOne({_id:ObjectId(req.params.id)})
    .then(result =>{
       res.send(result.deletedCount > 0);
    })
 })




    app.post('/addProduct', (req, res)=>{
        const newFood = req.body;
        console.log('adding new event: ', newFood)
        foodCollection.insertOne(newFood)
        .then(result => {
            console.log('inserted count' , result)
            res.send(result.insertedCount > 0)
        })
    })


  });
  








  app.listen(port, () => {
    console.log("Hello")
  })
  