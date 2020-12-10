import React, { useEffect, useState } from "react";
import axios from "axios";

// secrets
import { API_KEY } from "./secrets";

// map module
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "1500px",
  height: "900px",
};

function DisplayMap() {
  const [map, setMap] = React.useState(null);
  const [latitude, setLatitude] = useState(40.7128);
  const [longitude, setLongitude] = useState(-74.006);

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const getLatAndLongFromAddress = async (address) => {
    // im gonna translate the address to a lat and long
    address = encodeURIComponent("5 Hanover Square");
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;
    const { data } = await axios.get(url);
    console.log(data);

    // once you get the API_KEY working, this entire thing should work
    // "data" should have a latitude and a longitude
    // lets pretend this exists- it most likely does
    // this lat and long will be the pin that will be loaded onto the map
    const { lat, long } = data;
  };

  useEffect(() => {
    const address = "5 Hanover Square";
    getLatAndLongFromAddress(address);
  }, []);

  const onLoad = React.useCallback(function callback(map) {}, []);

  const onUnmount = React.useCallback(function callback(map) {}, []);

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <GoogleMapPin latitude={idk} longitude={idk1} />
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(DisplayMap);
