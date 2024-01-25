import { Row, Col, Table, Button , Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { Link, useNavigate, useParams} from "react-router-dom";

import { useState, useEffect } from "react";

const ItinerariesComponent = ({getItineraries, deleteItinerary, getItineraryDestinations, getCountries}) => {
    const {id} = useParams()
    const [itineraries, setItineraries] = useState([])


      useEffect(() => {
        getItineraries()
        .then(res => {
          //temp cuz dh api to search for userid
          const filtered = res.filter((itinerary) => itinerary.user_id == id)
            console.log("filtered", res)


        })
        .catch(er => console.log(er))
      }, [itineraries])
      
    // const deleteHandler = async (accountid) => {
    //     try {
    //         if (window.confirm("Are you sure?")) {
    //             const res = await deleteAccount(accountid)
    //             const updatedAccounts = accounts.filter((account) => account.id !== accountid);
    //             setAccounts(updatedAccounts)
    //             }
    //     }
    //     catch (er) {
    //         console.log(er)
    //     }

    // }

  return (
    <Row className="justify-content-center mt-5">
      <Col md={11} >
        <h1>
          My Itineraries {"    "}
          <LinkContainer to={`/createitinerary/${id}`} >
            <Button variant="primary" size="lg" className="ms-3">
              Create New Itinerary
            </Button>
          </LinkContainer>

        </h1>
        <Table className="mt-5" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Account Type</th>
              <th>Phone Number Linked</th>
              <th>Balance</th>
              <th>Transfer</th>
              <th>Deposit / Withdraw</th>
              <th>Close Account?</th>


            </tr>
          </thead>
          <tbody>
            {accounts?.map((account, idx) => (
              <tr key={idx}>
                <td>{account.id}</td>
                <td>{account.AccountType}</td>
                <td>{account.LinkPhone}</td>
                <td style={{ width: '30%' }}>$ {account.StartingBalance}</td>
                <td>
                  <LinkContainer to={`/transfer/${account.id}`}>
                    <Button className="btn-sm" variant="warning">
                      <i className="bi bi-arrow-left-right"></i>
                    </Button>
                  </LinkContainer>
                </td>
     
                <td>
                  <LinkContainer to={`/deposit/${account.id}`}>
                    <Button className="btn-sm" variant="success">
                      <i className="bi bi-plus-circle"></i>
                    </Button>
                  </LinkContainer>
                  {"  /  "}
                  <LinkContainer to={`/withdraw/${account.id}`}>
                    <Button className="btn-sm" variant="danger">
                      <i className="bi bi-dash-circle"></i>
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(account.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
      </Row>
  );
};

export default ItinerariesComponent;

