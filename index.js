const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://DripJournal:QjNJHLJU8smzHNiu@cluster0.bfg1fsg.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());

app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const information = client.db("DripJournal").collection("information");

    app.post("/information", async (req, res) => {
      const body = req.body;
      const result = await information.insertOne(body);
      res.send(result);
    });

    app.get("/allInformation", async (req, res) => {
      const result = await information.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Drip journal is running");
});
app.listen(port, () => {
  console.log("drip journal server in running on", port);
});
