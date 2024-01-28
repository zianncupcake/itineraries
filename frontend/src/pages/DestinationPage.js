import DestinationComponent from "../components/DestinationComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";


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


  
  return <DestinationComponent getDestinations={getDestinations} deleteDestination={deleteDestination} createDestination={createDestination} editDestination={editDestination} />;
};

export default DestinationPage;

