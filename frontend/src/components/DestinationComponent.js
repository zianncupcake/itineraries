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

const DestinationComponent = ({
  getDestinations,
  deleteDestination,
  createDestination,
  editDestination,
}) => {
  const { id } = useParams();
  const [destinations, setDestinations] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currEditingDestination, setCurrEditingDestination] = useState({});

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLabel, setSelectedLabel] = useState({});

  const [allDestinationsPerCountry, setAllDestinationsPerCountry] = useState(
    []
  );
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [success, setSuccess] = useState(false);


  const handleShowCreate = () => {
    setShowCreateModal(true);
    setSuccess(false)
    setSelectedLabel({});


  };
  const handleCloseCreate = () => {
    setShowCreateModal(false)
    setCurrEditingDestination({});
    setSelectedCountry('');

  };

  const handleShowEdit = (d) => {
    setShowEditModal(true);
    setSuccess(false)
    setCurrEditingDestination(d);
    setSelectedLabel(
      countries.find((country) => country.label.toString().slice(5) === d.countryname)
    );
    setSelectedCountry(d.countryname);

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

    console.log("selectedCountry", selectedCountry);

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

  // const handleCheckboxChange = (destination) => {
  //   console.log("destination passed in ", destination);
  //   const isSelected = selectedDestinations.find(
  //     (d) => d.destination_id === destination.destination_id
  //   );

  //   if (isSelected) {
  //     setSelectedDestinations(
  //       selectedDestinations.filter(
  //         (d) => d.destination_id !== destination.destination_id
  //       )
  //     );
  //   } else {
  //     setSelectedDestinations([...selectedDestinations, destination]);
  //   }
  // };

  useEffect(() => {
    // This ensures the effect runs only after the initial render  
    getDestinations(id)
      .then((res) => {
        setDestinations(res);
        console.log("DESTINATIONS", res);
      })
      .catch((er) => console.log(er));
  }, [destinations]);

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

  const deleteHandler = async (destinationid) => {
    try {
      if (window.confirm("Are you sure?")) {
        const res = await deleteDestination(destinationid);
        // const updatedDestinations = destinations.filter(
        //   (d) => d.id !== destinationid
        // );
        // setDestinations(updatedDestinations);
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
    // console.log("selecteddestinations", selectedDestinations);

    const formInputs = {
      name: form.name.value,
      countryname: selectedCountry,
      cost: parseFloat(form.cost.value),
      notes: form.notes.value,
      user_id: parseInt(id),
    };
    console.log("form input", formInputs);

    if (showCreateModal) {
    createDestination(formInputs)
      .then((res) => {
        console.log("RESPONSE", res);
        setSuccess(true);
      })
      .catch((er) => console.log(er));
    } 
    else {
      editDestination(currEditingDestination.id, formInputs)
      .then((res) => {
        console.log("RESPONSE", res);
        setSuccess(true);
        setCurrEditingDestination(destinations.find(d => d.id == currEditingDestination.id))
      })
      .catch((er) => console.log(er));

    }
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col md={11}>
        <h1>
          My Destinations {"    "}
          <Button
            variant="secondary"
            size="lg"
            className="ms-3"
            onClick={handleShowCreate}
          >
            Create New Destination
          </Button>
        </h1>
        <Table className="mt-5" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Cost</th>
              <th>Notes</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {destinations?.map((destination, idx) => (
              <tr key={idx}>
                <td>{destination.name}</td>
                <td>{destination.countryname}</td>
                <td>{destination.cost}</td>
                <td
                  style={{
                    maxWidth: "400px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {destination.notes}
                </td>

                <td>
                  {/* <LinkContainer to={`/edititinerary/${itinerary.id}`}> */}
                  <Button
                    className="btn-sm"
                    onClick={() => handleShowEdit(destination)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  {/* </LinkContainer> */}
                  {"  /  "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(destination.id)}
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
            Create New Destination
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center p-5">
              <Col md={11}>
              <Form onSubmit={(e) => handleSubmit(e)}>               
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      required
                      type="text"
                      maxLength="50"
                    />
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
                    <Form.Label>Cost</Form.Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <Form.Control
                        name="cost"
                        required
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      name="notes"
                      required
                      type="text"
                    />
                  </Form.Group>
                  <Button
                    variant="secondary"
                    type="submit"
                    className="w-100 mt-5"
                  >
                    Create
                  </Button>
                  <Alert variant="success" className="mt-3" show={success}>
                    Successfully created destination
                  </Alert>

                  <Row></Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      

      <Modal size="xl" show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title className="text-muted ">
            Edit Destination
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center p-5">
              <Col md={11}>
                <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Select
                      options={countries}
                      value={selectedLabel}
                      onChange={(selectedOption) =>
                        handleSelectCountry(selectedOption)
                      }
                      isDisabled={true}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      required
                      type="text"
                      maxLength="100"
                      defaultValue={currEditingDestination.name}
                    />
                  </Form.Group>
                  {/* <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="Name"
                      required
                      type="text"
                      maxLength="100"
                      defaultValue={currEditingDestination.countryname}
                    />
                  </Form.Group>
 */}
                  <Form.Group className="mb-3">
                    <Form.Label>Cost</Form.Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <Form.Control
                        name="cost"
                        required
                        type="number"
                        step="0.01"
                        defaultValue={currEditingDestination.cost}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      name="notes"
                      required
                      type="text"
                      defaultValue={currEditingDestination.notes}
                    />
                  </Form.Group>

                  {/* <Form.Group className="mb-3">
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
                          <Dropdown.Item disabled>
                            No existing destinations for {selectedCountry} :(
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group> */}

                  <Button
                    variant="secondary"
                    type="submit"
                    className="w-100 mt-5"
                  >
                    Edit
                  </Button>
                  <Alert variant="success" className="mt-3" show={success}>
                    Successfully edited destination 
                  </Alert>

                  <Row></Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </Row>
  );
};

export default DestinationComponent;
