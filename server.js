const express = require("express")
const nodemailer = require("nodemailer")
const app = express()
// require("dotenv").config()
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
      user: "rafael.leonardi98@gmail.com",
      pass: "xsmtpsib-14b88fac59e593c02089ee09625328f201a1a5e03b6708a87b4953d8bbeeb253-1FEO83W0fVmQ6Bdr",
      subject: req.body.name,
      text: req.body.message,
    },
  })

  const mailOption = {
    from: req.body.email,
    to: "rafael.leonardi98@gmail.com",
  }

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log("error")
      res.send("error")
    } else {
      console.log("Message Sent:" + info.response)
    }
  })
})

app.listen(PORT, () => {
  console.log("server running on port" + PORT)
})
