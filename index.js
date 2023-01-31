const express = require("express");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// database connection user and password
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4vnd1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//  mongoDb driver node js

async function run() {
  try {
    await client.connect();
    const database = client.db("CoachingInfo");
    const student = database.collection("student");
    const teacherCollection = database.collection("techer");
    const picCollection2019 = database.collection("pic2019");
    const picCollection2020 = database.collection("pic2020");
    const picCollection2022 = database.collection("pic2022");

    // user details

    // app.post("/teacher", async (req, res) => {
    //   const name = req.body.name;
    //   const email = req.body.email;
    //   const info = req.body.info;
    //   const number = req.body.number;
    //   // base 64 system
    //   // base 64 system
    //   const pic = req.files.image;
    //   // console.log(pic);

    //   const picData = pic.data;
    //   // console.log(picData);
    //   const encodePic = picData.toString("base64");
    //   const imgBuffer = Buffer.from(encodePic, "base64");
    //   // base 64 clouse
    //   const teachers = {
    //     name,
    //     email,
    //     info,
    //     number,
    //     image: imgBuffer,
    //   };
    //   // sent data to server
    //   const result = await teacherCollection.insertOne(teachers);
    //   res.json(result);
    // });

    app.post("/picture", async (req, res) => {
      const find = req.body;
      const result = await picCollection2019.insertOne(find);

      res.send(find);
    });
    app.post("/student", async (req, res) => {
      const find = req.body;
      const result = await student.insertOne(find);

      res.send(result);
    });
    app.post("/picture2020", async (req, res) => {
      const find = req.body;
      const result = await picCollection2020.insertOne(find);

      res.send(res);
    });
    // techer info
    app.post("/teacher", async (req, res) => {
      const find = req.body;
      const result = await teacherCollection.insertOne(find);

      res.send(result);
    });
    app.post("/picture2022", async (req, res) => {
      const find = req.body;
      const result = await picCollection2022.insertOne(find);

      res.send(find);
    });
    // student inform
    app.get("/student1", async (req, res) => {
      const result = await student.find({}).toArray();
      res.send(result);
    });
    app.get("/picture", async (req, res) => {
      const result = await picCollection2019.find({}).toArray();
      res.send(result);
    });
    app.get("/picture2020", async (req, res) => {
      const result = await picCollection2020.find({}).toArray();
      res.send(result);
    });
    app.get("/picture2022", async (req, res) => {
      const result = await picCollection2022.find({}).toArray();
      res.send(result);
    });
    app.get("/teacher", async (req, res) => {
      const result = await teacherCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/student", async (req, res) => {
      const result = await student.find({}).toArray();
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Connecting and showing display");
});

app.listen(port, () => {
  console.log(` listening  ${port}`);
});
