import { BaseItem, PaginationMeta, baseSchema, restQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { MediaItem, mediaItemSchema } from "./user";

export type IncidentQueryParams = restQueryParams & {
  filters?: IncidentFilters;
};
export interface IncidentFilters {
  startDate?: Date;
}

export type IncidentItem = BaseItem & {
  type: "news" | "jobs";
  cover?: MediaItem;
  address?: string;
  longitude: number;
  latitude: number;
  category: "culture" | "sport" | "kids";
};

export interface IncidentData {
  data: IncidentItem[];
  meta: PaginationMeta;
}

const incidentsSchema = baseSchema.concat(
  object({
    address: string(),
    longitude: number().required(),
    latitude: number().required(),
    cover: mediaItemSchema,
  })
);

export type IncidentItemYup = InferType<typeof incidentsSchema>;
