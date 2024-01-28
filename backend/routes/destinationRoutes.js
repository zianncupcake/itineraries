const express = require('express')

const router = express.Router()

const {editDestination,deleteDestination,createDestination,getDestinations } = require("../controllers/destinationController")

//i gonna query. userid? 
router.get("/peruser/:userid", getDestinations)
router.put("/:destinationid", editDestination)
router.delete("/:destinationid", deleteDestination)
router.post("/", createDestination)


module.exports = router