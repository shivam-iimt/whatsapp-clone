const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 9000;
const Messages = require("./dbMessages.js");
const Pusher = require("pusher");
const cors = require("cors");

const pusher = new Pusher({
  appId: "1208324",
  key: "d2bde740ddc103283790",
  secret: "26dbc6b3665a33f458fa",
  cluster: "eu",
  useTLS: true,
});

// middleware
app.use(express.json());
app.use(cors());

// db config
const connection_url =
  "mongodb+srv://admin:rajbala123shivam@cluster0.9wpqi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log("connection unsuccess");
  });

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        recieved: messageDetails.recieved,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});

app.get("/", (req, res) => res.status(200).send("hello shivam"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

app.listen(port, () => console.log(`listening on port:${port}`));
