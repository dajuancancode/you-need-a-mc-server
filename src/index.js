require("dotenv").config()

const express = require("express")
const cors = require("cors")
const sgMail = require('@sendgrid/mail')

const app = express()

app.use(express.json())
app.use(cors())

sgMail.setApiKey(process.env.API_KEY)

app.post("/", async (req, res) => {
  const body = req.body
  const msg = {
    to: 'dajuancancode@gmail.com',
    from: `${body.email}`,
    subject: `${body.firstName} ${body.lastName} sent you a message from http://youneedamc.com`,
    content:  [
      {type: "text/plain", value: `${body.message}`}
    ]
  }

  try {
    await sgMail.send(msg)
    res.send("Sent")
    console.log("Good to go")
  } catch(error) {
    console.error(error)

    if(error.response) {
      console.error(error.response.body)
    }

    res.send("Not Sent")
  }
  
})

const port = 3001
app.listen(port, () => console.log(`[app]: Listening on port ${port}`))