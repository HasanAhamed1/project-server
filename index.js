const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0h8zi.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const projectCollection = client.db("projects").collection("project-data");
    
    app.get("/projects", async (req, res) => {
        const query = {};
        const cursor = projectCollection.find(query);
        const projects = await cursor.toArray();
        res.send(projects);
      });

    app.get("/projects/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const project = await projectCollection.findOne(query);
        res.send(project);
    });
  } 
  finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//tretryrtyr
