const express = require("express")
const app = express()

const authRoute = require("./routes/authRoute")
const orgRoute = require("./routes/organizationRoute")
const { Server } = require("socket.io")

const ejs = require("ejs")
app.set("view engine","ejs")

const cookierParser = require("cookie-parser")
require("./model/index")

app.use(cookierParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app.use("",authRoute)
// app.use("",orgRoute)
// app.use(express.json())

app.get("/",(req,res)=>{
    res.render("chat")
}
)



const server = app.listen(3000,()=>{
    console.log("Server has started at port 3000")
})

const io = new Server(server)

io.on("connection",(socket)=>{
    console.log("user connected")
    socket.on("message",(msg)=>{
        
        io.emit("broadCastMessage",msg)
    })
})
