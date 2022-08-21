import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.listen(4002, async () => {
  console.log("Listening query api on port 4002");
  try {

    const res = await axios.get("http://event-bus-service:4005/events");
    for (let event of res.data) {
      console.log("Processing Event: -> ", event.type);
      const { type, data } = event;
      handleEvent({ type, data });
    }
  } catch(error) {
    console.error('Error -> ', error);
  }
});

const posts = {};

const handleEvent = ({ type, data }) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  } else if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  } else if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comments = post.comments;
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log("Recieved Event -> ", req.body.type);
  const { type, data } = req.body;
  handleEvent({ type, data });
  res.send({});
});
