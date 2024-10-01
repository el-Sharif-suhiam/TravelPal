import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DirectionsIcon from "@mui/icons-material/Directions";
import { Bounds, Coordinates, SearchResponse } from "../../types";
import { AppContext } from "../../contexts/AppReducerContext";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

export default function SearchBox() {
  const [searchText, setSearchText] = React.useState<string>("");
  const [listPlace, setListPlace] = React.useState<SearchResponse[]>([]);
  const appContext = React.useContext(AppContext);
  const { state, dispatch } = appContext!;
  React.useEffect(() => {
    const fetchPlaces = async () => {
      const params: any = {
        q: searchText,
        format: "json",
        addressdetails: 1,
        polygon_geojson: 0,
      };
      const queryString = new URLSearchParams(params).toString();
      const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
      };
      await fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          //console.log(JSON.parse(result));
          if (result.length > 1) {
            setListPlace(result);
          }
        })
        .catch((err) => console.log("err: ", err));
    };
    fetchPlaces();
  }, [searchText]);

  function handleSearchClick() {
    console.log("hello");
    const searchResult = listPlace.filter(
      (ele) => ele.display_name === searchText
    );
    const bounds: Bounds = {
      sw: {
        lat: +searchResult[0].boundingbox[0],
        lng: +searchResult[0].boundingbox[2],
      },
      ne: {
        lat: +searchResult[0].boundingbox[1],
        lng: +searchResult[0].boundingbox[3],
      },
    };
    const postion: Coordinates = {
      lat: +searchResult[0].lat,
      lng: +searchResult[0].lon,
    };
    dispatch({ type: "SET_COORDINATES", payload: postion });
    dispatch({ type: "SET_BOUNDS", payload: bounds });
    console.log(bounds);
  }
  return (
    <Paper
      component="form"
      sx={{
        p: "0",
        margin: "10px",
        display: "flex",
        alignItems: "center",
        width: 300,
      }}
    >
      <Autocomplete
        disablePortal
        getOptionLabel={(e: any) => e.display_name}
        options={listPlace}
        sx={{ flex: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            onBlur={(event) => setSearchText(event.target.value)}
            value={searchText}
            placeholder="Search"
            variant="outlined"
            style={{
              border: "none",
              borderRadius: "15px",
            }}
          />
        )}
      />
      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
        onClick={handleSearchClick}
      >
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}
