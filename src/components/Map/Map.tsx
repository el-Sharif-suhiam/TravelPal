import React from "react";
import { Typography, Rating } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AppContext } from "../../contexts/AppReducerContext";
import L from "leaflet";
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/TravelPal/images/marker-icon-2x.png",
  iconUrl: "/TravelPal/images/marker-icon.png",
  shadowUrl: "/TravelPal/images/marker-shadow.png",
});

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  mapContainer: {
    height: "85vh",
    width: "100%",
  },
  markerContainer: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    "&:hover": { zIndex: 2 },
  },
  pointer: {
    cursor: "pointer",
    width: "2",
  },
}));

function GetLocation() {
  const appContext = React.useContext(AppContext);
  const { state, dispatch } = appContext!;
  const theMap = useMap();
  const map = useMapEvents({
    click() {
      const bounds = {
        ne: map.getBounds().getNorthEast(),
        sw: map.getBounds().getSouthWest(),
      };
      console.log(map.getCenter());
      dispatch({ type: "SET_COORDINATES", payload: map.getCenter() });
      dispatch({ type: "SET_BOUNDS", payload: bounds });
    },
  });
  React.useEffect(() => {
    theMap.setView(L.latLng(state.coordinates!));
  }, [state.coordinates]);
  return <></>;
}

function Map() {
  const appContext = React.useContext(AppContext);
  const { state, dispatch } = appContext!;
  const classes = useStyles();
  React.useEffect(() => {
    window.onload = () => {
      const getflag = document.querySelector(".leaflet-attribution-flag");
      if (getflag) {
        getflag.remove();
      }
    };
  }, []);

  return (
    <MapContainer
      center={state.coordinates!}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GetLocation />
      {state.places?.map((place, i) => {
        if (place.latitude) {
          const postion = {
            lat: Number(place.latitude),
            lng: Number(place.longitude),
          };
          return (
            <Marker position={postion} key={i}>
              <Popup minWidth={160}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                  onClick={() =>
                    dispatch({ type: "SET_POPUP_CLICKED", payload: i })
                  }
                ></div>
                <Typography variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  style={{ width: "140px" }}
                  src={
                    place.photo
                      ? place.photo.images.medium.url
                      : "https://thumbs.dreamstime.com/z/billboard-menu-placeholder-outside-cafe-street-near-restaurant-terrace-seats-sunset-light-billboard-menu-placeholder-133674477.jpg"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={+place.rating} readOnly />
              </Popup>
            </Marker>
          );
        }
      })}
    </MapContainer>
  );
}

export default Map;
