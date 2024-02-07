import { BaseItem, PaginationMeta, baseSchema, restQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { MediaItem, mediaItemSchema } from "./user";

export type InfoQueryParams = restQueryParams & {
  filters?: InfoFilters;
};
export interface InfoFilters {
  startDate?: Date;
}

export type InfoItem = BaseItem & {
  type: "news" | "jobs";
  cover: MediaItem;
  document: MediaItem;
};

export interface InfoData {
  data: InfoItem[];
  meta: PaginationMeta;
}

const infosSchema = baseSchema.concat(
  object({
    type: mixed().oneOf(["news", "jobs"]).required(),
    cover: mediaItemSchema,
    document: mediaItemSchema,
  })
);

export type InfoItemYup = InferType<typeof infosSchema>;
