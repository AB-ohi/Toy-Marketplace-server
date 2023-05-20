var express = require('express')
var cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
var app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.qthn2pl.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const toyCollection = client.db('Toy-Marketplace').collection('toys');
    const blogCollection = client.db('Toy-Marketplace').collection('blog');
    const AllToyCollection = client.db('Toy-Marketplace').collection('All-toy');
    const AddToyCollection = client.db('Toy-Marketplace').collection('Add-toy');

    app.get('/toys', async(req,res)=>{
      const cursor = toyCollection.find();
      const result = await cursor.toArray()
      res.send(result);
    })
    app.get('/blog', async(req,res)=>{
      const cursor = blogCollection.find();
      const result = await cursor.toArray()
      res.send(result);
    })
    app.get('/allToy', async(req,res)=>{
      const cursor = AllToyCollection.find();
      const result = await cursor.toArray()
      res.send(result);
    })
    app.get('/addToy', async(req,res)=>{
      const cursor = AddToyCollection.find();
      const result = await cursor.toArray()
      res.send(result);
    })

    app.post('/addToy', async(req, res)=>{
      const nweToy = req.body;
      const result = await AddToyCollection.insertOne(nweToy);
      res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', function (req, res) {
  res.send('server is running')
})

app.listen(port ,() => {
  console.log(`CORS-enabled web server listening on port:${port}`)
})