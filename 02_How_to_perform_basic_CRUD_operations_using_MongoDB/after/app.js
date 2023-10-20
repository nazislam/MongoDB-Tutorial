import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 4000;
const dbUrl = 'mongodb+srv://naz-islam:bYgoj10KBqzbCLgL@cluster0.4uhhaho.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'sample_guides';
const dbCollection = 'planets';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({"currentRoute": "/"});
});

app.get('/planets/all', (req, res) => {
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(dbUrl);
      const db = await client.db(dbName);
      const response = await db.collection(dbCollection).find().toArray();
      res.json(response);
    } catch (error) {
      throw error;
    }
  }())
});

app.post('/planets', (req, res) => {
  const reqObj = req.body;
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(dbUrl);
      const db = await client.db(dbName);
      const response = await db.collection(dbCollection).insertOne(reqObj);
      res.json(response);
    } catch (error) {
      throw error;
    }
  }())
});

app.put('/planets/:name', (req, res) => {
  const planetName = req.params['name'];
  const reqObj = req.body;
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(dbUrl);
      const db = await client.db(dbName);
      const response = await db.collection(dbCollection).findOneAndUpdate(
        { name: planetName },
        { $set: reqObj }
      );
      res.json(response);
    } catch (error) {
      throw error;
    }
  }())
});

app.delete('/planets/:name', (req, res) => {
  const planetName = req.params['name'];
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(dbUrl);
      const db = await client.db(dbName);
      const response = await db.collection(dbCollection).deleteOne(
        { name: planetName }
      );
      res.json(response);
    } catch (error) {
      throw error;
    }
  }())
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})