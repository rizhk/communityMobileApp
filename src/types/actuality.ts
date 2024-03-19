import { BaseItem, PaginationMeta, baseSchema, RestQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { MediaItem, mediaItemSchema } from "./user";

export type ActualityQueryParams = RestQueryParams & {
  filters?: ActualityFilters;
};
export interface ActualityFilters {
  startDate?: Date;
  type?: ActualityType;
}

export type ActualityType = "Pilier public" | "Actualités" | "Emplois";
// export type ActualityType = typeof ActualityType[number];

export type ActualityItem = BaseItem & {
  type: ActualityType;
  cover: MediaItem;
  document: MediaItem;
};

export interface ActualitiesData {
  data: ActualityItem[];
  meta: PaginationMeta;
}

const actualitiesSchema = baseSchema.concat(
  object({
    type: mixed().oneOf(["news", "jobs"]).required(),
    cover: mediaItemSchema,
    document: mediaItemSchema,
  })
);

export type ActualityItemYup = InferType<typeof actualitiesSchema>;
