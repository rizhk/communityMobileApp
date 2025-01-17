import { BaseItem, PaginationMeta, baseSchema, RestQueryParams } from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { MediaItem, mediaItemSchema } from "./user";

export type OfficialQueryParams = RestQueryParams & {
  filters?: OfficialFilters;
};
export interface OfficialFilters {
  startDate?: Date;
}

export type TeamItem = BaseItem & {
  type: string; //TS: add types
  name: string;
  surname: string;
  fonction: string;
  dicastere: string;
  phone: string;
  title: string;
  descriptionDicastere: string;
  suppleant: string;
  mail: string;
  avatar: MediaItem;
};

export interface TeamsData {
  data: TeamItem[];
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
