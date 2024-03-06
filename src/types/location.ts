import { BaseItem, PaginationMeta, baseSchema, RestQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { MediaItem, mediaItemSchema } from "./user";

export type LocationQueryParams = RestQueryParams & {
  filters?: LocationFilters;
};
export interface LocationFilters {
  startDate?: Date;
}

export type LocationItem = BaseItem & {
  type: "news" | "jobs";
  cover: MediaItem;
  latitude: number;
  longitude: number;
  address?: string;
};

export interface LocationsData {
  data: LocationItem[];
  meta: PaginationMeta;
}
export interface LocationData {
  data: LocationItem;
  meta: PaginationMeta;
}

const locationsSchema = baseSchema.concat(
  object({
    address: string(),
    longitude: number().required(),
    latitude: number().required(),
    cover: mediaItemSchema,
  })
);

export type LocationItemYup = InferType<typeof locationsSchema>;
