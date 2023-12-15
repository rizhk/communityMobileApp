// @ts-ignore
import { GOOGLE_ADDRESS_KEY } from "@env";
import axios from "axios";
import * as Location from "expo-location";
import I18n from "i18n-js";

const RADIUS = 10000;

export interface AddressSuggestions {
  description: string;
  place_id: string;
}

export async function fetchSuggestions(input: string) {
  const { status } = await Location.requestForegroundPermissionsAsync();

  let response = null;
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&rankBy=distance&language=${I18n.locale}&key=${GOOGLE_ADDRESS_KEY}`
    );
  } else {
    const loc = await Location.getCurrentPositionAsync({});
    response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&location=${loc.coords.latitude}%2C-${loc.coords.longitude}&radius=${RADIUS}&language=${I18n.locale}&key=${GOOGLE_ADDRESS_KEY}`
    );
  }
  return response.data.predictions;
}

export async function fetchPlaceDetails(placeId: string) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_ADDRESS_KEY}`
  );
  return response.data.result.geometry.location;
}

export async function fetchLocalPosition() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return null;
  }

  const loc = await Location.getCurrentPositionAsync({});
  return loc.coords;
}

export async function fetchAddressFromCoords(coords: { latitude: number; longitude: number }) {
  if (coords.latitude === 0 && coords.longitude === 0) return "";
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${GOOGLE_ADDRESS_KEY}`
  );
  console.log(response.data.results[0], "ressullts");
  return response.data.results[0].formatted_address;
}

export async function fetchShortAddressFromCoords(coords: { latitude: number; longitude: number }) {
  if (coords.latitude === 0 && coords.longitude === 0) return "";
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${GOOGLE_ADDRESS_KEY}`
  );

  const addressComponents = response.data.results[0].address_components;
  const shortAddress = `${addressComponents[0]?.short_name} ${addressComponents[1]?.short_name}, ${addressComponents[6]?.short_name}  ${addressComponents[2]?.short_name}`;
  return shortAddress;
}
