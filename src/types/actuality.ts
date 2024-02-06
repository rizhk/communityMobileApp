import { PaginationMeta, baseSchema, restQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { mediaItemSchema } from "./user";

//****** ACTUALITY ******\\
export type ActualityQueryParams = restQueryParams & {
  filters?: ActualityFilters;
};

//export type ActualityByRegionQueryParams = ActualityQueryParams & { maxDistance?: number; region: Region | null };

export interface ActualityFilters {
  startDate?: Date;
}

const actualitiesSchema = baseSchema.concat(
  object({
    type: mixed().oneOf(["news", "jobs"]).required(),
    cover: mediaItemSchema,
    document: mediaItemSchema,
  })
);

export type ActualityItem = InferType<typeof actualitiesSchema>;

export interface ActualityData {
  data: ActualityItem[];
  meta: PaginationMeta;
}
