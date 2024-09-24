import { Dispatch } from "react";

export interface FetchResponse<T> {
  data?: T;
  error?: boolean;
  message?: string;
}

export interface SearchResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}

export interface Address {
  country: string;
  country_code: string;
}

export interface TravelWithBoundry {
  location_id: string;
  name: string;
  latitude: string;
  longitude: string;
  num_reviews: string;
  timezone: string;
  location_string: string;
  photo: Photo;
  awards: any[];
  doubleclick_zone: string;
  preferred_map_engine: string;
  raw_ranking: string;
  ranking_geo: string;
  ranking_geo_id: string;
  ranking_position: string;
  ranking_denominator: string;
  ranking_category: string;
  ranking: string;
  distance: string;
  distance_string: string;
  bearing: string;
  rating: string;
  is_closed: boolean;
  open_now_text: string;
  is_long_closed: boolean;
  price_level: string;
  price: string;
  description: string;
  web_url: string;
  write_review: string;
  ancestors: Ancestor[];
  category: Category;
  subcategory: Category[];
  parent_display_name: string;
  is_jfy_enabled: boolean;
  nearest_metro_station: any[];
  phone: string;
  website: string;
  email: string;
  address_obj: AddressObj;
  address: string;
  hours: Hours;
  is_candidate_for_contact_info_suppression: boolean;
  cuisine: Category[];
  dietary_restrictions: any[];
  establishment_types: Category[];
}

export interface AddressObj {
  street1: string;
  street2: null;
  city: string;
  state: null;
  country: string;
  postalcode: string;
}

export interface Ancestor {
  subcategory: Category[];
  name: string;
  abbrv: null;
  location_id: string;
}

export interface Category {
  key: string;
  name: string;
}

export interface Hours {
  week_ranges: Array<WeekRange[]>;
  timezone: string;
}

export interface WeekRange {
  open_time: number;
  close_time: number;
}

export interface Photo {
  images: Images;
  is_blessed: boolean;
  uploaded_date: string;
  caption: string;
  id: string;
  helpful_votes: string;
  published_date: string;
  user: User;
}

export interface Images {
  small: Large;
  thumbnail: Large;
  original: Large;
  large: Large;
  medium: Large;
}

export interface Large {
  width: string;
  url: string;
  height: string;
}

export interface User {
  user_id: null;
  member_id: string;
  type: string;
}
export type Bounds = { ne: Coordinates; sw: Coordinates } | null;

export type Coordinates = { lat: number; lng: number } | null;
export type MapComponentProps = {
  coordinates?: Coordinates;
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>;
  setBounds: React.Dispatch<React.SetStateAction<Bounds>>;
  places?: TravelWithBoundry[];
  setPopupClicked?: React.Dispatch<React.SetStateAction<number | undefined>>;
};
export type Types = "restaurants" | "hotels" | "attractions";
export type Rating = 0 | 3 | 4 | 4.5;
export interface AppState {
  places: TravelWithBoundry[];
  coordinates: Coordinates;
  popupClicked: number | undefined;
  bounds: Bounds;
  isLoading: boolean;
  types: Types;
  rating: Rating;
  allplaces: TravelWithBoundry[];
}
export type ActionType = { type: string; payload?: any };
export interface AppContextType {
  state: AppState;
  dispatch: Dispatch<ActionType>;
}
