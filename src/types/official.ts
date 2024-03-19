import { BaseItem, PaginationMeta, baseSchema, RestQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { MediaItem, mediaItemSchema } from "./user";

export type OfficialQueryParams = RestQueryParams & {
  filters?: OfficialFilters;
};
export interface OfficialFilters {
  startDate?: Date;
}

export type MemberItem = BaseItem & {
  type: string; //TS: add types
  name: string;
  surname: string;

  avatar: MediaItem;
  document: MediaItem;
};

export interface MembersData {
  data: MemberItem[];
  meta: PaginationMeta;
}

const officialsSchema = baseSchema.concat(
  object({
    // category: mixed().oneOf(['culture', 'sport', 'kids', /* add more categories as needed */]).required(),
    cover: mediaItemSchema,
    document: mediaItemSchema,
  })
);

export type OfficialItemYup = InferType<typeof officialsSchema>;
