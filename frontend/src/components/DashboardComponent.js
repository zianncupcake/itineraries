import {
  Row,
  Col,
  Table,
  Button,
  Badge,
  Modal,
  Form,
  Container,
  Dropdown,
  Alert,
} from "react-bootstrap";
import CountrySelect from "react-bootstrap-country-select";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import Select from "react-select";

const DashboardComponent = ({
  getItineraries,
  getDestinations,
  deleteItinerary,
  createItinerary,
  editItinerary
}) => {
  const { id } = useParams();
  const [itineraries, setItineraries] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currEditingItinerary, setCurrEditingItinerary] = useState({});

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLabel, setSelectedLabel] = useState({});
const [allDestinations, setAllDestinations] = useState([])
  const [allDestinationsPerCountry, setAllDestinationsPerCountry] = useState(
    []
  );
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleShowCreate = () => {
    setShowCreateModal(true);
    setSuccess(false)
    setSelectedDestinations([]);


  };
  const handleCloseCreate = () => {
    setShowCreateModal(false)
    setSelectedDestinations([]);
    setCurrEditingItinerary({});
    setSelectedLabel({});
    setSelectedDestinations([]);
    setAllDestinationsPerCountry([]);
    setSelectedCountry('');



  };

  const handleShowEdit = (i) => {
    console.log("itinerary passed in to edit" ,i)
    setShowEditModal(true);
    setSuccess(false)
    setCurrEditingItinerary(i);
    setSelectedLabel(
      countries.find((country) => country.label.toString().slice(5) === i.name)
    );
    setSelectedCountry(i.name);
    setSelectedDestinations(i.destinations);

    console.log("selecteddestinations", i.destinations);
    console.log("alldestinationspercountry", allDestinations.filter(d => d.countryname == i.name ));
    setAllDestinationsPerCountry(allDestinations.filter(d => d.countryname == i.name));

    // const allDestinations = itineraries
    //   .filter((itinerary) => itinerary.name == i.name)
    //   .map((itinerary) => itinerary.destinations)
    //   .flat();

    // const uniqueDestinations = Array.from(
    //   new Map(
    //     allDestinations.map((dest) => [dest.destination_id, dest])
    //   ).values()
    // );
    // console.log("uniquedestinations", uniqueDestinations);

    // console.log("alldestinations", allDestinations);
    // setAllDestinationsPerCountry(uniqueDestinations);
  };

  const handleCloseEdit = () => setShowEditModal(false);

  const handleSelectCountry = (selectedOption) => {
    setSelectedLabel(selectedOption);
    const selected = selectedOption.label.toString().slice(5);

    console.log("selected", selected);
    setSelectedCountry(selected);
    console.log(selectedOption.label.toString().slice(5));
    setAllDestinationsPerCountry(allDestinations.filter(d => d.countryname == selected))


    // setAllDestinationsPerCountry(allDestinations.filter(d => d.countryname == selected))

    // getDestinations(id)
    // .then(res => {
      
    // })
    // .catch(er => console.log(er))


    // const filteredItineraries = itineraries.filter(
    //   (itinerary) => itinerary.name == selected
    // );
    // console.log(filteredItineraries);
    // const allDestinations = filteredItineraries
    //   .map((itinerary) => itinerary.destinations)
    //   .flat();

    // const uniqueDestinations = Array.from(
    //   new Map(
    //     allDestinations.map((dest) => [dest.destination_id, dest])
    //   ).values()
    // );
    // console.log("uniquedestinations", uniqueDestinations);

    // console.log("alldestinations", allDestinations);
    // setAllDestinationsPerCountry(uniqueDestinations);
  };

  const handleCheckboxChange = (destination) => {
    console.log("destination passed in ", destination);
    console.log("SELECTED DESTIONATIONS", selectedDestinations);
    const isSelected = selectedDestinations.some(
      (d) => d.destination_id === destination.id
    );

    console.log("is selected", isSelected)

    // delete destination.countryname;
    // console.log("REMOVED COUNTRYNAME FROM DESTINATION", destination)

    // const updatedDestination = { destination_id: destination.id, ...destination };    
    // console.log("UPDATED DESTINATION",updatedDestination);

    const updatedDestination = {
      destination_id: destination.id, // Change id to destination_id
  country_id: destination.country_id,
  cost: destination.cost,
  name: destination.name,
  notes: destination.notes,
  itinerary_id: currEditingItinerary.id

    }

    console.log("UPDATED", updatedDestination)
    





    if (isSelected) {
      setSelectedDestinations(
        selectedDestinations.filter(
          (d) => d.destination_id !== updatedDestination.destination_id
        )
      );
    } else {
      setSelectedDestinations([...selectedDestinations, updatedDestination]);
    }
  };

  // const handleCheckboxChange = (destination) => {
  //   const isSelected = selectedDestinations.some(
  //     (dest) => dest.destination_id === destination.destination_id
  //   );

  //   if (isSelected) {
  //     // If the destination is already selected, remove it from the selection
  //     setSelectedDestinations(
  //       selectedDestinations.filter(
  //         (dest) => dest.destination_id !== destination.destination_id
  //       )
  //     );
  //   } else {
  //     // If the destination is not selected, add it to the selection
  //     setSelectedDestinations([...selectedDestinations, destination]);
  //   }
  // };

  // const handleCheckboxChange = (destination) => {
  //   const isSelected = selectedDestinations.some(
  //     (dest) => dest.destination_id === destination.destination_id
  //   );

  //   if (isSelected) {
  //     // If the destination is already selected, remove it from the selection
  //     setSelectedDestinations(
  //       selectedDestinations.filter(
  //         (dest) => dest.destination_id !== destination.destination_id
  //       )
  //     );
  //   } else {
  //     // If the destination is not selected, add it to the selection
  //     setSelectedDestinations([...selectedDestinations, destination]);
  //   }
  // };

  const removeCountryName = (obj) => {
    const { countryname, ...rest } = obj;
    return rest;
  };


  useEffect(() => {
    getItineraries(id)
      .then((res) => {
        console.log("itinerariesjdefngvig", res)
        setItineraries(res);
      })
      .catch((er) => console.log(er));

      getDestinations(id)
      .then(res => {
        setAllDestinations(res)
 
      })
      .catch(er => console.log(er))

  }, [itineraries]);

  useEffect(() => {
    axios
      .get(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
      )
      .then((res) => {
        console.log("COUNTRIES", res.data);
        setCountries(res.data.countries);
      });
  }, []);

  const deleteHandler = async (itineraryid) => {
    try {
      if (window.confirm("Are you sure?")) {
        const res = await deleteItinerary(itineraryid);
        const updatedItineraries = itineraries.filter(
          (itinerary) => itinerary.id !== itineraryid
        );
        setItineraries(updatedItineraries);
      }
    } catch (er) {
      console.log(er);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);

    const form = event.currentTarget.elements;
    console.log("form", form);

    // const finalDestinations = allDestinationsPerCountry.filter((d) =>
    //   selectedDestinations.includes(d.destination_id)
    // );
    // console.log("finaldestnations", finalDestinations);
    console.log("selecteddestinations", selectedDestinations);

    const formInputs = {
      title: form.title.value,
      budget: parseFloat(form.budget.value),
      name: selectedCountry,
      destinations: selectedDestinations,
      user_id: parseInt(id),
    };
    console.log("form input", formInputs);

    if (showCreateModal) {
    createItinerary(formInputs)
      .then((res) => {
        console.log("RESPONSE", res);
        setSuccess(true);
      })
      .catch((er) => console.log(er));
    } else {
      editItinerary(currEditingItinerary.id, formInputs)
      .then((res) => {
        console.log("RESPONSE", res);
        setSuccess(true);
        setCurrEditingItinerary(itineraries.find(i => i.id == currEditingItinerary.id))
      })
      .catch((er) => console.log(er));


    }
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col md={11}>
        <h1>
          My Itineraries {"    "}
          <Button
            variant="secondary"
            size="lg"
            className="ms-3"
            onClick={handleShowCreate}
          >
            Create New Itinerary
          </Button>
        </h1>
        <Table className="mt-5" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Budget</th>
              <th>Country</th>
              <th>Destinations</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {itineraries?.map((itinerary, idx) => (
              <tr key={idx}>
                <td>{itinerary.title}</td>
                <td>{itinerary.budget}</td>
                <td>{itinerary.name}</td>
                <td
                  style={{
                    maxWidth: "400px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {itinerary.destinations
                    .map((destination) => destination.name)
                    .join(", ")}
                </td>
                <td>
                  {/* <LinkContainer to={`/edititinerary/${itinerary.id}`}> */}
                  <Button
                    className="btn-sm"
                    onClick={() => handleShowEdit(itinerary)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  {/* </LinkContainer> */}
                  {"  /  "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(itinerary.id)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
      <Modal size="xl" show={showCreateModal} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title className="text-muted ">
            Create New Itinerary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center p-5">
              <Col md={11}>
                {/* <Form onSubmit={(e) => handleSubmit(e)}> */}
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      required
                      type="text"
                      maxLength="100"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Budget</Form.Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <Form.Control
                        name="budget"
                        required
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Select
                      options={countries}
                      value={selectedLabel}
                      onChange={(selectedOption) =>
                        handleSelectCountry(selectedOption)
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Destinations</Form.Label>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        style={{
                          backgroundColor: "white",
                          color: "grey",
                          borderColor: "#d3d3d3",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        disabled={selectedCountry == "" ? true : false}
                      >
                        {selectedDestinations.length > 0
                          ? `${selectedDestinations
                              .map((destination) => destination.name)
                              .join(", ")}`
                          : `Select Destinations For ${selectedCountry}`}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="w-100 p-2 text-muted">
                        {allDestinationsPerCountry.length > 0 ? (
                          allDestinationsPerCountry.map((destination) => (
                            <Form.Check
                              key={destination.destination_id}
                              type="checkbox"
                              name="destinations"
                              id={destination.destination_id}
                              label={`${destination.name}   ($${destination.cost})`}
                              checked={selectedDestinations.find(
                                (d) =>
                                  d.destination_id ===
                                  destination.destination_id
                              )}
                              onChange={() => handleCheckboxChange(destination)}
                            />
                          ))
                        ) : (
                          // <div style ={{display:"flex", gap:"5px"}}>
                          // <Dropdown.Item disabled>
                          //   No existing destinations for {selectedCountry}
                          // </Dropdown.Item>
                          // <Nav.Link href="/createdestination">Create New Destination</Nav.Link>
                          // </div>
                          <Dropdown.Item disabled>
                            No existing destinations for {selectedCountry} :(
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>

                  <Button
                    variant="secondary"
                    type="submit"
                    className="w-100 mt-5"
                  >
                    Create
                  </Button>
                  <Alert variant="success" className="mt-3" show={success}>
                    Successfully created itinerary
                  </Alert>

                  <Row></Row>
                  {/* <Alert variant="danger" className="mt-3" show={showAlert}>
              {alertMessage}
            </Alert>
            <Alert variant="success" className="mt-3" show={success}>
              Successfully created claim
            </Alert> */}
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>

      <Modal size="xl" show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title className="text-muted ">
            Edit Itinerary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center p-5">
              <Col md={11}>
                {/* <Form onSubmit={(e) => handleSubmit(e)}> */}
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      required
                      type="text"
                      maxLength="100"
                      defaultValue={currEditingItinerary.title}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Budget</Form.Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <Form.Control
                        name="budget"
                        required
                        type="number"
                        step="0.01"
                        defaultValue={currEditingItinerary.budget}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Select
                      options={countries}
                      value={selectedLabel}
                      onChange={(selectedOption) =>
                        handleSelectCountry(selectedOption)
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Destinations</Form.Label>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        style={{
                          backgroundColor: "white",
                          color: "grey",
                          borderColor: "#d3d3d3",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        disabled={selectedCountry == "" ? true : false}
                      >
                        {selectedDestinations.length > 0
                          ? `${selectedDestinations
                              .map((destination) => destination.name)
                              .join(", ")}`
                          : `Select Destinations For ${selectedCountry}`}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="w-100 p-2 text-muted">
                        {allDestinationsPerCountry.length > 0 ? (
                          allDestinationsPerCountry.map((destination) => (
                            <Form.Check
                              key={destination.destination_id}
                              type="checkbox"
                              name="destinations"
                              id={destination.destination_id}
                              label={`${destination.name}   ($${destination.cost})`}
                              checked={selectedDestinations.some(
                                (d) => d.destination_id === destination.id
                              )}
                              onChange={() => handleCheckboxChange(destination)}
                            />
                          ))
                        ) : (
                          // <div style ={{display:"flex", gap:"5px"}}>
                          // <Dropdown.Item disabled>
                          //   No existing destinations for {selectedCountry}
                          // </Dropdown.Item>
                          // <Nav.Link href="/createdestination">Create New Destination</Nav.Link>
                          // </div>
                          <Dropdown.Item disabled>
                            No existing destinations for {selectedCountry} :(
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>

                  <Button
                    variant="secondary"
                    type="submit"
                    className="w-100 mt-5"
                  >
                    Edit
                  </Button>
                  <Alert variant="success" className="mt-3" show={success}>
                    Successfully edited itinerary 
                  </Alert>

                  <Row></Row>
                  {/* <Alert variant="danger" className="mt-3" show={showAlert}>
              {alertMessage}
            </Alert>
            <Alert variant="success" className="mt-3" show={success}>
              Successfully created claim
            </Alert> */}
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </Row>
  );
};

export default DashboardComponent;
