const express = require("express")

const app = express()
// const destinationRoutes = require("./destinationRoutes")
const itineraryRoutes = require("./itineraryRoutes")
// const itinerarydestinationRoutes = require("./itinerarydestinationRoutes")
// const userRoutes = require("./userRoutes")


// app.use("/destination", destinationRoutes)
app.use("/itinerary", itineraryRoutes)
// app.use("/itinerarydestination", itinerarydestinationRoutes)
// app.use("/user", userRoutes)


module.exports = app