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
        itinerary_destination.id,
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
      console.log(filtered);
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
    const { country_id, user_id, budget, title, name, destinations } = req.body;
    const itineraryQuery = `
        UPDATE itinerary
        SET country_id=?, user_id=?, budget=?, title=?
        WHERE id=?
      `;
    await db.query(itineraryQuery, [
      country_id,
      user_id,
      budget,
      title,
      itineraryid,
    ]);

    //u still need to store 2 values to get the dropdown. 1. is all destinations that u input before for a country to show all the options 2. is the destinations u selected

    const placeholders = destinations.map(() => "(?, ?)").join(", ");
    const itinerarydestinationQuery = `
      START TRANSACTION;

      DELETE FROM itinerary_destination WHERE itinerary_id = ?;
      INSERT INTO itinerary_destination (itinerary_id, destination_id) VALUES
        ${placeholders};
    
      COMMIT;    `;
    await db.query(itinerarydestinationQuery, [itineraryid, ...destinations]);

    //       // Successful update
    res.status(200).json({ message: "itinerary updated successfully" });
  } catch (err) {
    console.log(err);
  }
};
const createItinerary = async (req, res) => {
  try {
    const { country_id, user_id, budget, title, name, destinationsList } = req.body;

    const q = `
            INSERT INTO itinerary 
            (country_id, user_id, budget, title) 
            VALUES (?, ?, ?, ?)
          `;
    const output = await db.query(q, [country_id, user_id, budget, title]);

    const placeholders = destinationsList.map(() => `(${output.insertId}, ?)`).join(", ");
    const itinerarydestinationQuery = `
      INSERT INTO itinerary_destination (itinerary_id, destination_id) VALUES
        ${placeholders};
    
      COMMIT;    `;
    await db.query(itinerarydestinationQuery, [output.insertId, ...destinationsList]);


    res.status(200).json({ message: "itinerary create successfully", output:output});
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
