var express = require("express")
var app = express()
require("dotenv").config()
var nodemailer = require("nodemailer")
var PORT = process.env.PORT || 5000

// Middleware
app.use(express.static("public"))

// json
app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/form.html")
})

// ---

app.post("/", (req, res) => {
  console.log(req.body)
  var name = req.body.names
  var email = req.body.emailValue
  var message = req.body.message

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  var mailOptions = {
    from: email,
    to: "rafael.leonardi98@gmail.com",
    subject: name,
    text: message,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error")
      res.send("error")
    } else {
      console.log("inviata" + info.response)
    }
  })
})

app.listen(PORT, () => {
  console.log("server running on port" + PORT)
})
