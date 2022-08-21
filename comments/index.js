import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from 'cors';
import axios from 'axios'

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.listen(4001, () => {
  console.log("Listening comments api on port 4001");
});

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id]);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({id: commentId, content, status: 'pending'});
  commentsByPostId[req.params.id] = comments;
  await axios.post("http://event-bus-service:4005/events", {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending'
    }
  })
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Recieved Event -> ", req.body.type);
  const {type, data} = req.body;
  if (type === 'CommentModerated') {
    const {postId, id, status, content} = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    await axios.post('http://event-bus-service:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        postId,
        status,
        content
      }
    })
  }
  res.send({});
});
