//Import Dependencies
const express = require("express")
const app = express()
require("dotenv").config()

//Allow Parsing
app.use(express.json())

//Import API Routes
const watsonRoutes = require("./routes/api/watson")

//Direct requests to Watson Routes
app.use("/api/watson", watsonRoutes)


//Start Server
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("Server listening on port ", port)
    console.log("Hello World!")
})