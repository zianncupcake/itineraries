const db = require("../db");

const getItineraries = async (req, res) => {
  try {
    const userid = req.params.userid;
    const q1 = `
        SELECT
          itinerary.id,
          itinerary.country_id,
          itinerary.user_id,
          itinerary.budget,
          itinerary.title,
          country.name 
        FROM
          itinerary
        JOIN
          country ON itinerary.country_id = country.id
        WHERE
        itinerary.user_id = ?;
      `;

    const itineraryXcountry = await db.query(q1, [userid]);
    const itinerarytable = itineraryXcountry.map((itinerary) => ({
      ...itinerary,
      destinations: [],
    }));

    const q2 = `
      SELECT

        itinerary_destination.itinerary_id,
        itinerary_destination.destination_id,
        destination.country_id,
        destination.cost,
        destination.name,
        destination.notes

      FROM
      itinerary_destination
      JOIN
      destination ON itinerary_destination.destination_id = destination.id
    `;

    const itinerarydestinationXdestination = await db.query(q2, []);

    itinerarytable.forEach((itinerary) => {
      const filtered = itinerarydestinationXdestination.filter(
        (x) => x.itinerary_id === itinerary.id
      );
    //   console.log(filtered);
      itinerary.destinations = filtered;
    });
    res.json(itinerarytable);
  } catch (error) {
    console.error(error);
  }
};

const editItinerary = async (req, res) => {
  try {
    const itineraryid = req.params.itineraryid;
    const { user_id, budget, title, name, destinations } = req.body;

    const q0 = ` SELECT * FROM country WHERE name = ?;`

    const countryExists = await db.query(q0, [name])

    let country_id = ''

    if (countryExists.length > 0) {
        country_id = countryExists[0].id
    } else {
        const result = await db.query('INSERT INTO country (name) VALUES (?)', [name]);
        country_id = result.insertId
    }

    console.log(country_id)

    const itineraryQuery = `
        UPDATE itinerary
        SET country_id=?, user_id=?, budget=?, title=?
        WHERE id=?
      `;
    const output1 =await db.query(itineraryQuery, [
      country_id,
      user_id,
      budget,
      title,
      itineraryid,
    ]);

    const destinationsList = destinations.map((d) => parseInt(d.destination_id))
    console.log("destinationslist ", destinationsList)


    const itinerarydestinationQuery1 = `DELETE FROM itinerary_destination WHERE itinerary_id = ?;`;
    const output2 = await db.query(itinerarydestinationQuery1, [itineraryid]);

    if (destinationsList.length > 0) {

    const placeholders = destinationsList.map(() => `(${itineraryid}, ?)`).join(", ");
    const itinerarydestinationQuery2 = `INSERT INTO itinerary_destination (itinerary_id, destination_id) VALUES ${placeholders};`;
    const output3 = await db.query(itinerarydestinationQuery2, [...destinationsList]);
    }


    res.status(200).json({ message: "itinerary edited successfully", output1:output1, output2:output2});
    console.log("output1", output1)
    console.log("output2", output2)

  } catch (err) {
    console.log(err);
  }
};
const createItinerary = async (req, res) => {
  try {
    const {user_id, budget, title, name, destinations } = req.body;
    let country_id = ''

    const q0 = ` SELECT * FROM country WHERE name = ?;`

    const countryExists = await db.query(q0, [name])
    console.log("COUNTRYEXISTS",countryExists)

    if (countryExists.length > 0) {
        country_id = countryExists[0].id
    } else {
        const result = await db.query('INSERT INTO country (name) VALUES (?)', [name]);
        console.log("RESULT", result)
        country_id = result.insertId
    }

    console.log("COUNTRY ID", country_id)

    const q = `
            INSERT INTO itinerary 
            (country_id, user_id, budget, title) 
            VALUES (?, ?, ?, ?)
          `;
    const output1 = await db.query(q, [country_id, user_id, budget, title]);
    const destinationsList = destinations.map((d) => parseInt(d.destination_id))
    console.log("destinationslist ", destinationsList)

    if (destinationsList.length > 0) {


    const placeholders = destinationsList.map(() => `(${output1.insertId}, ?)`).join(", ");
    const itinerarydestinationQuery = `
      INSERT INTO itinerary_destination (itinerary_id, destination_id) VALUES ${placeholders} `;
    const output2 = await db.query(itinerarydestinationQuery, [...destinationsList]);
    }


    res.status(200).json({ message: "itinerary create successfully", output1:output1});
    console.log("output1", output1)
  } catch (err) {
    console.log(err);
  }
};

const deleteItinerary = async (req,res) => {
    try {
        const itineraryid = req.params.itineraryid;

        const itineraryQuery = 'DELETE FROM itinerary WHERE id = ?';
        await db.query(itineraryQuery, [itineraryid]);

        const itinerarydestinationQuery = 'DELETE FROM itinerary_destination WHERE itinerary_id = ?';
        await db.query(itinerarydestinationQuery, [itineraryid]);

    
        res.status(200).json({ message: 'Claim deleted successfully' });
    } catch(err) {
        console.log(err)
    }
}


module.exports = { getItineraries, editItinerary, createItinerary, deleteItinerary };

// const {getItineraries,getItinerary,editItinerary,deleteItinerary,createItinerary } = require("../controllers/itineraryController")

// router.get("/peruser/:userid", getItineraries)
// router.get("/:itineraryid", getItinerary)
// router.put("/:itineraryid", editItinerary)
// router.delete("/:itineraryid", deleteItinerary)
// router.post("/", createItinerary)
