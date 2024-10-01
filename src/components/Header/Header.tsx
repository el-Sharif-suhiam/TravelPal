import React from "react";
import { AppBar, Toolbar, Typography, Box, alpha } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import SearchBox from "./SearchBox";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    display: "none",
    marginRight: "20px !important",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    display: "flex",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit !important",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          TravelPal
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h6" className={classes.title}>
            Your personal advisor on your travel
          </Typography>
          <SearchBox />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
