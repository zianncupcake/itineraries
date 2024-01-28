import DestinationComponent from "../components/DestinationComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";
import {
    Row,
    Col,

  } from "react-bootstrap";
import NavComponent from "../components/NavComponent";



const DestinationPage = () => {

    const getDestinations = async (userid) => {
        const { data } = await axios.get(`http://localhost:8800/api/destination/peruser/${userid}`);
        return data;
    }  

    const deleteDestination = async (id) => {
        const { data } = await axios.delete(`http://localhost:8800/api/destination/${id}`);
        return data;
    }  

    const createDestination = async (formInputs) => {
        const { data } = await axios.post(`http://localhost:8800/api/destination/`, { ...formInputs });
        return data;
    }  

    const editDestination = async (id, formInputs) => {
        const { data } = await axios.put(`http://localhost:8800/api/destination/${id}`, { ...formInputs });
        return data;
    }  


  
  return (
    <Row style={{ height: "900px" }}>
<Col md={2} style={{paddingLeft:"40px", paddingRight:"0px"}} >
  <Row className="h-100" >
  <NavComponent />
  </Row>
</Col>

<Col md={10} className="px-5">
    <Row className="h-100" >
    <DestinationComponent getDestinations={getDestinations} deleteDestination={deleteDestination} createDestination={createDestination} editDestination={editDestination} />;
    </Row>
</Col>
</Row>

  )
  
  
  
  
};

export default DestinationPage;

