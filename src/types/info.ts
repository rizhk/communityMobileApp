import { PaginationMeta, restQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { mediaItemSchema } from "./user";

export type InfoQueryParams = restQueryParams & {
  filters?: InfoFilters;
};

export interface InfoFilters {
  startDate?: Date;
}

const infosSchema = object({
  title: string().required(),
  content: string().required(), // Assuming RTE content is a string
  startDate: date(),
  endDate: date(),
  type: mixed().oneOf(["news", "jobs"]).required(),
  cover: mediaItemSchema,
  document: mediaItemSchema,
});

export type InfoItem = InferType<typeof infosSchema>;

export interface InfoData {
  data: InfoItem[];
  meta: PaginationMeta;
}
