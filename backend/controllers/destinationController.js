const db = require("../db");

const getDestinations = async (req, res) => {
  try {
    const userid = req.params.userid;
    const q1 = `
    SELECT DISTINCT destination.*, country.name AS countryname
    FROM destination
    LEFT JOIN country ON country.id = destination.country_id
    LEFT JOIN itinerary ON country.id = itinerary.country_id
    WHERE itinerary.user_id = ? OR itinerary.user_id IS NULL;
              `;

    const destinations = await db.query(q1, [userid]);
    res.json(destinations);
    // console.log("DESTINATIONS", destinations)
  } catch (error) {
    console.error(error);
  }
};

const editDestination = async (req, res) => {
  try {
    const destinationid = req.params.destinationid;
    const { countryname, cost, name, notes} = req.body;

    let country_id = ''

    const q0 = ` SELECT * FROM country WHERE name = ?;`

    const countryExists = await db.query(q0, [countryname])
    console.log("COUNTRYEXISTS",countryExists)

    if (countryExists.length > 0) {
        country_id = countryExists[0].id
    } else {
        const result = await db.query('INSERT INTO country (name) VALUES (?)', [countryname]);
        console.log("RESULT", result)
        country_id = result.insertId
    }

    console.log("COUNTRY ID", country_id)



    const itineraryQuery = `
        UPDATE destination
        SET country_id=?, cost=?, name=?, notes=?
        WHERE id=?
      `;
    const output =await db.query(itineraryQuery, [
      country_id,
      cost,
      name,
      notes,
      destinationid,
    ]);

    res.status(200).json({ message: "destination edited successfully", output:output});


  } catch (err) {
    console.log(err);
  }
};
const createDestination = async (req, res) => {
  try {
    const {countryname, cost, name, notes} = req.body;
    let country_id = ''

    const q0 = ` SELECT * FROM country WHERE name = ?;`

    const countryExists = await db.query(q0, [countryname])
    console.log("COUNTRYEXISTS",countryExists)

    if (countryExists.length > 0) {
        country_id = countryExists[0].id
    } else {
        const result = await db.query('INSERT INTO country (name) VALUES (?)', [countryname]);
        console.log("RESULT", result)
        country_id = result.insertId
    }

    console.log("COUNTRY ID", country_id)

    const q = `
            INSERT INTO destination 
            (country_id, cost, name, notes) 
            VALUES (?, ?, ?, ?)
          `;
    const output = await db.query(q, [country_id, cost, name, notes]);

    res.status(200).json({ message: "destination created successfully", output:output});
    console.log("output1", output)
  } catch (err) {
    console.log(err);
  }
};

const deleteDestination = async (req,res) => {
    try {
        const destinationid = req.params.destinationid;

        const itinerarydestinationQuery = 'DELETE FROM itinerary_destination WHERE destination_id = ?';
        await db.query(itinerarydestinationQuery, [destinationid]);


        const destinationQuery = 'DELETE FROM destination WHERE id = ?';
        await db.query(destinationQuery, [destinationid]);

    
        res.status(200).json({ message: 'destination deleted successfully' });
    } catch(err) {
        console.log(err)
    }
}


module.exports = { getDestinations, editDestination, createDestination, deleteDestination };

// const {getItineraries,getItinerary,editItinerary,deleteItinerary,createItinerary } = require("../controllers/itineraryController")

// router.get("/peruser/:userid", getItineraries)
// router.get("/:itineraryid", getItinerary)
// router.put("/:itineraryid", editItinerary)
// router.delete("/:itineraryid", deleteItinerary)
// router.post("/", createItinerary)
