const express = require("express")
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors());


const apiRoutes = require("./routes/apiRoutes")

app.use('/api', apiRoutes)

// app.get("/", (req,res) => {
//     res.json("hello this is the backend")
// })

app.listen(8800, () => {
    console.log("Connected to backend!")
})