import "./App.css";
import React from "react";
import { CssBaseline } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getPlacesData } from "./api";
import { AppContext } from "./contexts/AppReducerContext";

function App() {
  const theme = createTheme();
  const appContext = React.useContext(AppContext);
  const { state, dispatch } = appContext!;
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        dispatch({
          type: "SET_COORDINATES",
          payload: { lat: latitude, lng: longitude },
        });
      }
    );
  }, []);
  React.useEffect(() => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    getPlacesData(state.bounds, state.types).then((data: any) => {
      dispatch({ type: "SET_ALLPLACES", payload: data });
      const filtered = data?.filter((place: { rating: string | number }) =>
        state.rating > 0 ? +place.rating >= state.rating : place
      );
      dispatch({ type: "SET_PLACES", payload: filtered });

      dispatch({ type: "SET_IS_LOADING", payload: false });
    });
  }, [state.bounds, state.types]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%", height: "95vh" }}>
        <Grid
          size={{ xs: 12, md: 4 }}
          style={{ boxShadow: "0 0 5px #777", borderRadius: "10px" }}
        >
          <List />
        </Grid>
        <Grid
          size={{ xs: 12, md: 8 }}
          style={{ boxShadow: "0 5px 15px #777", borderRadius: "10px" }}
        >
          <Map />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
