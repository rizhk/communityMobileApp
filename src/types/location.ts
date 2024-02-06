import { PaginationMeta, restQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { mediaItemSchema } from "./user";

export type LocationQueryParams = restQueryParams & {
  filters?: LocationFilters;
};

//export type LocationByRegionQueryParams = LocationQueryParams & { maxDistance?: number; region: Region | null };

export interface LocationFilters {
  startDate?: Date;
}

const locationsSchema = object({
  title: string().required(),
  content: string().required(), // Assuming RTE content is a string
  startDate: date(),
  endDate: date(),
  address: string(),
  longitude: number().required(),
  latitude: number().required(),
  // category: mixed().oneOf(['culture', 'sport', 'kids', /* add more categories as needed */]).required(),
  cover: mediaItemSchema,
  //TODO: Add tags insead of category ?
});

export type LocationItem = InferType<typeof locationsSchema>;

export interface LocationData {
  data: LocationItem[];
  meta: PaginationMeta;
}
