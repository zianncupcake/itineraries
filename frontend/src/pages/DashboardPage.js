import DashboardComponent from "../components/DashboardComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";
import NavComponent from "../components/NavComponent";
import {
    Row,
    Col,

  } from "react-bootstrap";
  


const DashboardPage = () => {

    const getItineraries = async (userid) => {
        const { data } = await axios.get(`http://localhost:8800/api/itinerary/peruser/${userid}`);
        return data;
    }  

    const getDestinations = async (userid) => {
        const { data } = await axios.get(`http://localhost:8800/api/destination/peruser/${userid}`);
        return data;
    }  


    const deleteItinerary = async (id) => {
        const { data } = await axios.delete(`http://localhost:8800/api/itinerary/${id}`);
        return data;
    }  

    const createItinerary = async (formInputs) => {
        const { data } = await axios.post(`http://localhost:8800/api/itinerary/`, { ...formInputs });
        return data;
    }  

    const editItinerary = async (id, formInputs) => {
        const { data } = await axios.put(`http://localhost:8800/api/itinerary/${id}`, { ...formInputs });
        return data;
    }  


  
  return (



<Row style={{ height: "900px" }}>
<Col md={2} style={{paddingLeft:"40px", paddingRight:"0px"}} >
  <Row className="h-100" >
  <NavComponent  />
  </Row>
</Col>

<Col md={10} className="px-5">
    <Row className="h-100" >
    <DashboardComponent getItineraries={getItineraries} getDestinations={getDestinations} deleteItinerary={deleteItinerary} createItinerary={createItinerary} editItinerary={editItinerary} />
    </Row>
</Col>
</Row>

  )
};

export default DashboardPage;

