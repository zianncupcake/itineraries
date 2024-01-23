import ItinerariesComponent from "../components/ItinerariesComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";


const ItinerariesPage = () => {

    const getItineraries = async () => {
        const { data } = await axios.get(`http://localhost:8000/itinerary/`);
        return data;
    }  

    const deleteItinerary = async (id) => {
        const { data } = await axios.delete(`http://localhost:8000/itinerary/${id}`);
        return data;
    }  

    const getItineraryDestinations = async () => {
        const { data } = await axios.get(`http://localhost:8000/itinerary_destination/`);
        return data;
    }  
    const getCountries = async () => {
        const { data } = await axios.get(`http://localhost:8000/country/`);
        return data;
    }  

  
  return <ItinerariesComponent getItineraries={getItineraries} deleteItinerary={deleteItinerary} getItineraryDestinations={getItineraryDestinations} getCountries={getCountries}/>;
};

export default ItinerariesPage;

