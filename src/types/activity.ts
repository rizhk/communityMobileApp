import { BaseItem, PaginationMeta, baseSchema, RestQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { MediaItem, mediaItemSchema } from "./user";

export type ActivityQueryParams = RestQueryParams & {
  filters?: ActivityFilters;
};
export interface ActivityFilters {
  startDate?: Date;
}

export type ActivityItem = BaseItem & {
  type: "news" | "jobs";
  latitude?: number;
  longitude?: number;
  cover: MediaItem;
  document: MediaItem;
  startDate: Date;
  endDate: Date;
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
