import { PaginationMeta, restQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";

//****** ACTIVITY ******\\
export type ActivityQueryParams = restQueryParams & {
  filters?: ActivityFilters;
};

//export type ActivityByRegionQueryParams = ActivityQueryParams & { maxDistance?: number; region: Region | null };

export interface ActivityFilters {
  startDate?: Date;
}

const actualitiesSchema = object({
  title: string().required(),
  content: string().required(), // Assuming RTE content is a string
  startDate: date(),
  endDate: date(),
  type: mixed().oneOf(["news", "jobs"]).required(),
  // cover: mediaSchema,
  // document: mediaSchema,
});

export type ActivityItem = InferType<typeof actualitiesSchema>;

export interface ActivitiesData {
  data: ActivityItem[];
  meta: PaginationMeta;
}
