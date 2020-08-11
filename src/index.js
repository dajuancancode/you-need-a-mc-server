if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();

app.use(express.json());
app.use(cors());

sgMail.setApiKey(process.env.API_KEY);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the API</h1>");
});

app.post("/", async (req, res) => {
  const body = req.body;
  const msg = {
    to: "dajuancancode@gmail.com",
    from: `${body.email}`,
    subject: `${body.firstName} ${body.lastName} sent you a message from http://youneedamc.com`,
    content: [{ type: "text/plain", value: `${body.message}` }],
  };

  try {
    await sgMail.send(msg);
    res.send("Sent");
  } catch (error) {
    res.status(400);
    res.send("Not Sent");
  }
});

const port = 3001;
app.listen(port, () => console.log(`[app]: Listening on port ${port}`));
