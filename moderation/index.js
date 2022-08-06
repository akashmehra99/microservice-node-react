import express from "express";
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.listen(4003, () => {
  console.log("Listening moderation api on port 4003");
});

app.post("/events", async(req, res) => {
    console.log("Recieved Event -> ", req.body.type);
    const {type, data} = req.body;
    if (type === 'CommentCreated') {
      let {id, content, postId, status} = data;
      status = content.includes('orange') ? 'rejected' : 'approved';

      await axios.post('http://localhost:4005/events', {
        type: 'CommentModerated',
        data: {
            id,
            postId,
            content,
            status
        }
      });
    }
    res.send({});
});
