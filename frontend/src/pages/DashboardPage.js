import DashboardComponent from "../components/DashboardComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";


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


  
  return <DashboardComponent getItineraries={getItineraries} getDestinations={getDestinations} deleteItinerary={deleteItinerary} createItinerary={createItinerary} editItinerary={editItinerary} />;
};

export default DashboardPage;

