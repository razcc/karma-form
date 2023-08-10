require("dotenv").config()
const express = require("express")
const nodemailer = require("nodemailer")
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.static("public"))
app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/form.html")
})

app.post("/", (req, res) => {
  console.log(req.body)

  const transporter = nodemailer.createTransport({
    service: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      subject: "Message from:" + req.body.name,
      text: req.body.message,
    },
  })

  const mailOption = {
    from: req.body.email,
    to: process.env.SMTP_USER,
  }

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log("error")
      res.send("error")
    } else {
      console.log("Message Sent:" + info.response)
      req.send("success")
    }
  })
})

app.listen(PORT, () => {
  console.log("server running on port" + PORT)
})
