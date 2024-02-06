import { PaginationMeta, restQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { mediaItemSchema } from "./user";

//****** ACTUALITY ******\\
export type ActivityQueryParams = restQueryParams & {
  filters?: ActivityFilters;
};

//export type ActivityByRegionQueryParams = ActivityQueryParams & { maxDistance?: number; region: Region | null };

export interface ActivityFilters {
  startDate?: Date;
}

const activitiesSchema = object({
  title: string().required(),
  content: string().required(), // Assuming RTE content is a string
  startDate: date(),
  endDate: date(),
  // category: mixed().oneOf(['culture', 'sport', 'kids', /* add more categories as needed */]).required(),
  cover: mediaItemSchema,
  document: mediaItemSchema,
});

export type ActivityItem = InferType<typeof activitiesSchema>;

export interface ActivityData {
  data: ActivityItem[];
  meta: PaginationMeta;
}
