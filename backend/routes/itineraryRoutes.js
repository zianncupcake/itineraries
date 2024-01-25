const express = require('express')

const router = express.Router()

// const {getItineraries,getItinerary,editItinerary,deleteItinerary,createItinerary } = require("../controllers/itineraryController")
const {getItineraries, editItinerary,createItinerary,deleteItinerary } = require("../controllers/itineraryController")

router.get("/peruser/:userid", getItineraries) 
// router.get("/:itineraryid", getItinerary)
router.put("/:itineraryid", editItinerary)
router.delete("/:itineraryid", deleteItinerary)
router.post("/", createItinerary)



module.exports = router