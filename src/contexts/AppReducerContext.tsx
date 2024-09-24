import React, { createContext, useReducer } from "react";
import {
  ActionType,
  AppContextType,
  AppState,
  Bounds,
  Coordinates,
  Rating,
  TravelWithBoundry,
  Types,
} from "../types";

// Define action types for each state update
const SET_PLACES = "SET_PLACES";
const SET_COORDINATES = "SET_COORDINATES";
const SET_POPUP_CLICKED = "SET_POPUP_CLICKED";
const SET_BOUNDS = "SET_BOUNDS";
const SET_IS_LOADING = "SET_IS_LOADING";
const SET_TYPES = "SET_TYPES";
const SET_RATING = "SET_RATING";
const SET_ALLPLACES = "SET_ALLPLACES";

// Initial state
const initialState: AppState = {
  places: [] as TravelWithBoundry[],
  coordinates: { lat: 32.1009, lng: 20.0808 } as Coordinates,
  popupClicked: undefined as number | undefined,
  bounds: {
    ne: { lat: 32.17371, lng: 20.15234 },
    sw: { lat: 32.03455, lng: 20.0193 },
  } as Bounds,
  isLoading: false as boolean,
  types: "restaurants" as Types,
  rating: 0 as Rating,
  allplaces: [] as TravelWithBoundry[],
};

// Reducer function to update state
export function appReducer(state: AppState, action: ActionType) {
  switch (action.type) {
    case SET_PLACES:
      return { ...state, places: action.payload };
    case SET_COORDINATES:
      return { ...state, coordinates: action.payload };
    case SET_POPUP_CLICKED:
      return { ...state, popupClicked: action.payload };
    case SET_BOUNDS:
      return { ...state, bounds: action.payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_TYPES:
      return { ...state, types: action.payload };
    case SET_RATING:
      return { ...state, rating: action.payload };
    case SET_ALLPLACES:
      return { ...state, allplaces: action.payload };
    default:
      return state;
  }
}

// Create Context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the provider
export function AppReducerContext({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
