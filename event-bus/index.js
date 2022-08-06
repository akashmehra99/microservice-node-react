import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.listen(4005, () => {
  console.log("Listening event-bus api on port 4005");
});

let events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  axios.post("http://localhost:4000/events", event).catch((error) => console.error(error.message));
  axios.post("http://localhost:4001/events", event).catch((error) => console.error(error.message));
  axios.post("http://localhost:4002/events", event).catch((error) => console.error(error.message));
  axios.post("http://localhost:4003/events", event).catch((error) => console.error(error.message));
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
})
