const express = require("express")
const app = express()

const authRoute = require("./routes/authRoute")
const orgRoute = require("./routes/organizationRoute")

const cookierParser = require("cookie-parser")
require("./model/index")

app.use(cookierParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("",authRoute)
app.use("",orgRoute)
app.use(express.json())






app.listen(3000,()=>{
    console.log("Server has started at port 3000")
})
