import { PaginationMeta, baseSchema, restQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { mediaItemSchema } from "./user";

export type IncidentQueryParams = restQueryParams & {
  filters?: IncidentFilters;
};

//export type IncidentByRegionQueryParams = IncidentQueryParams & { maxDistance?: number; region: Region | null };

export interface IncidentFilters {
  startDate?: Date;
}

const incidentsSchema = baseSchema.concat(
  object({
    address: string(),
    longitude: number().required(),
    latitude: number().required(),
    // category: mixed().oneOf(['culture', 'sport', 'kids', /* add more categories as needed */]).required(),
    cover: mediaItemSchema,
    //TODO: Add tags insead of category ?
  })
);

export type IncidentItem = InferType<typeof incidentsSchema>;

export interface IncidentData {
  data: IncidentItem[];
  meta: PaginationMeta;
}
