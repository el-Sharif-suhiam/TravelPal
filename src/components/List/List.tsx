import React, { useRef } from "react";
import {
  CircularProgress,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import Grid from "@mui/material/Grid2";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { AppContext } from "../../contexts/AppReducerContext";
const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "120px",
    marginBottom: "30px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "15px",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  list: {
    height: "75vh",
    overflow: "auto",
    padding: "0 10px",
    boxShadow: "0 -2px 5px #777",
    marginTop: "5px",
  },
}));

function List() {
  const classes = useStyles();
  const appContext = React.useContext(AppContext);
  const { state, dispatch } = appContext!;
  const refs = useRef<any>([]);
  React.useEffect(() => {
    if (state.popupClicked && refs.current[state.popupClicked]) {
      refs.current[state.popupClicked].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [state.popupClicked]);
  React.useEffect(() => {
    const filtered = state.allplaces?.filter(
      (place: { rating: string | number }) =>
        state.rating > 0 ? +place.rating >= state.rating : place
    );
    dispatch({ type: "SET_PLACES", payload: filtered });
  }, [state.rating]);

  return (
    <div className={classes.container}>
      <Typography
        variant="h4"
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        Restaurants, Hotels & Attractions around you
      </Typography>
      {state.isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Box
            sx={{ minWidth: 120 }}
            style={{
              display: "flex",
              gap: "15px",
              margin: "10px",
              marginBottom: "20px",
              justifyContent: "center",
            }}
          >
            <FormControl style={{ minWidth: "120px", width: "200px" }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={state.types}
                label="Type"
                onChange={(e) => {
                  dispatch({ type: "SET_TYPES", payload: e.target.value });
                }}
              >
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              style={{ minWidth: "120px", width: "200px" }}
              className={classes.formControl}
            >
              <InputLabel>Rating</InputLabel>
              <Select
                value={state.rating}
                label="Rating"
                onChange={(e) => {
                  dispatch({ type: "SET_RATING", payload: e.target.value });
                }}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Grid container spacing={3} className={classes.list}>
            {state.places?.map((place, i) => (
              <Grid size={12} key={i} ref={(el) => (refs.current[i] = el)}>
                <PlaceDetails place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

export default List;
