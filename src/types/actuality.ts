import { BaseItem, PaginationMeta, baseSchema, restQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { MediaItem, mediaItemSchema } from "./user";

export type ActualityQueryParams = restQueryParams & {
  filters?: ActualityFilters;
};
export interface ActualityFilters {
  startDate?: Date;
}

export type ActualityItem = BaseItem & {
  type: "news" | "jobs";
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
