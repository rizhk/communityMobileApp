import { BaseItem, PaginationMeta, baseSchema, restQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { MediaItem, mediaItemSchema } from "./user";

export type ActivityQueryParams = restQueryParams & {
  filters?: ActivityFilters;
};
export interface ActivityFilters {
  startDate?: Date;
}

export type ActivityItem = BaseItem & {
  type: "news" | "jobs";
  cover: MediaItem;
  document: MediaItem;
};

export interface ActivitiesData {
  data: ActivityItem[];
  meta: PaginationMeta;
}

const activitiesSchema = baseSchema.concat(
  object({
    // category: mixed().oneOf(['culture', 'sport', 'kids', /* add more categories as needed */]).required(),
    cover: mediaItemSchema,
    document: mediaItemSchema,
  })
);

export type ActivityItemYup = InferType<typeof activitiesSchema>;
