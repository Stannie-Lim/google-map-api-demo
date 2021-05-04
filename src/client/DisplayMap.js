import React, { useEffect, useState } from "react";
import axios from "axios";

// secrets
import { API_KEY } from "./secrets";

// map module
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "1500px",
  height: "900px",
};

function DisplayMap() {
  // coordinates for 5 hanover square aka fullstack building
  const [latitude, setLatitude] = useState(40.7128);
  const [longitude, setLongitude] = useState(-74.006);

  const [pin, setPin] = useState({
    latitude,
    longitude,
  });

  const center = {
    lat: latitude,
    lng: longitude,
  };

  useEffect(() => {
    const getLatAndLongFromAddress = async (address) => {
      // translate the address to a lat and long
      address = encodeURIComponent(address);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;
      try {
        const { data } = await axios.get(url);
        console.log(data);
        if (data.error_message) {
          alert(
            "bad api key so the pin wont work, but at least map still shows"
          );
        }

        // once you get the API_KEY working, this entire thing should work
        // this lat and long will be the pin that will be loaded onto the map
        const { lat, long } = data;
        setPin({
          latitude: lat,
          longitude: long,
        });
      } catch (err) {
        console.log(err);
      }
    };

    const address = "5 Hanover Square";
    getLatAndLongFromAddress(address);
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    console.log("loaded successfully");
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    console.log("unmounted successfully");
  }, []);

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker latitude={pin.latitude} longitude={pin.longitude} />
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(DisplayMap);
