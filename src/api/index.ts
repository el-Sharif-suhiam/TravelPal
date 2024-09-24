import { Bounds, FetchResponse, Types } from "../types";
const apiKey = import.meta.env.VITE_TRAVEL_ADVISOR_API;
const options: RequestInit = {
  method: "GET",
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
  },
};
export async function getPlacesData<TravelWithBoundry>(
  bounds: Bounds,
  type: Types
): Promise<FetchResponse<TravelWithBoundry>> {
  const url = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?`;
  const params: any = {
    bl_latitude: bounds?.sw?.lat,
    tr_latitude: bounds?.ne?.lat,
    bl_longitude: bounds?.sw?.lng,
    tr_longitude: bounds?.ne?.lng,
  };
  try {
    const response = await fetch(
      url + new URLSearchParams(params).toString(),
      options
    );
    if (!response.ok) {
      throw new Error("something goes wrong, erorr status: " + response.status);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    // Handle any errors from fetching or server issues
    console.error(
      "Fetch error:",
      error instanceof Error ? error.message : "Unknown fetching error"
    );
    return {
      error: true,
      message:
        error instanceof Error ? error.message : "Unknown fetching error",
    };
  }
}
