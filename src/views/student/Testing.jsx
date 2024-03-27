import axios from 'axios';
import React, { useEffect } from 'react'

const Testing = () => {
 const  handleMap = async() => {
    
const options = {
    method: 'POST',
    url: 'https://rdrunnerxx-trackservice.p.rapidapi.com/geocode',
    headers: {
      'content-type': 'application/json',
      ContentType: 'text/json; charset=utf-8',
      'X-RapidAPI-Key': 'fee9d2f76cmsha6654ed67aca14cp159bdbjsn23d750d5c041',
      'X-RapidAPI-Host': 'rdrunnerxx-trackservice.p.rapidapi.com'
    },
    data: {
      StartLocation: {
        LatLong: {
          Latitude: -23.554533,
          Longitude: -46.6922909
        }
      },
      FinishLocation: {
        LatLong: {
          Latitude: -23.654533,
          Longitude: -46.49229
        }
      },
      DistanceUnit: 0
    }
  };
    
      try {
        console.log("IN 2");
          const response = await axios.request(options);
          console.log("Repo: ",response);
      } catch (error) {
          console.error(error);
      }
 }
 useEffect(() => { handleMap();}, []);
  return (
    <div>Testing</div>
  )
}

export default Testing