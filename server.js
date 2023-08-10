const express = require("express")

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.static("public"))
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/form.html")
})

app.listen(PORT, () => {
  console.log("server running on port" + PORT)
})
