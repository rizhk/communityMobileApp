import { Region } from "react-native-maps";
import { FieldValidation } from "./global";
import { PaginationMeta, restQueryParams } from "./global";
import { SportItem } from "./sport";
import { UserItem } from "./user";
import { object, string, number, date, InferType } from "yup";

//****** ACTIVITY ******\\
// export interface ActivityQueryParams extends restQueryParams {
export type ActivityQueryParams = restQueryParams & {
  filters?: ActivityFilters;
};

// export interface ActivityByRegionQueryParams extends ActivityQueryParams {
export type ActivityByRegionQueryParams = ActivityQueryParams & { maxDistance?: number; region: Region | null };

//TODO: Put right filters
export interface ActivityFilters {
  sportName?: string;
  sportId?: number;
  sport?: {
    name?: string;
    id?: number;
  };
  date?: string;
  maxDistance?: number;
}

//YUP Validation
export const activityItemSchema = object({
  id: number().required().positive().integer(),
  name: string(),
  maxParticipants: number().required().positive().integer(),
  latitude: number().required(),
  longitude: number().required(),
  date: date().required(),
  startHour: string().required(),
  endHour: string().required(),
  location: string().required(),
  description: string().required(),
  // author: userItemSchema.required(),
  // participants: object({
  //   data: array().of(userItemSchema).required(),
  // }),
  // blockedUsers: object({
  //   data: array().of(userItemSchema).required(),
  // }),
  // sport: object({
  //   data: sportItemStrapiSchema.required(),
  // }),
  // 'mixed' type for complex or unknown types
});

// parse and assert validity
// const user = await userSchema.validate(console.log("ok"));

export type ActivityItem = InferType<typeof activityItemSchema>;

export interface ActivityItemManual {
  id: number;
  name: string;
  maxParticipants: number;
  latitude: number;
  longitude: number;
  date: Date;
  startHour: string;
  endHour: string;
  location: string;
  description: string;
  author: UserItem;
  participants: UserItem[]; //TODO: Check types
  blockedUsers: UserItem[];
  sport: SportItem;
  channel: any;
}

export interface ActivitiesData {
  data: ActivityItem[];
  meta: PaginationMeta;
}

export interface ActivityFormData extends ActivityFormSchema {
  label?: string;
  type: ActivityFormType;
  multiple?: boolean;
  searchable?: boolean;
  labelLocation?: string;
  labelActualLocation?: string;
}
export interface ActivityFormSchema {
  value: ActivityType;
  initialValue?: number | string | boolean | Date | any[];
  validation: FieldValidation;
}

export interface ActivityFormData extends ActivityFormSchema {
  label?: string;
  type: ActivityFormType;
  multiple?: boolean;
  searchable?: boolean;
  labelLocation?: string;
  labelActualLocation?: string;
}

export type ActivityFormType =
  | "media"
  | "LocationPicker"
  | "DateTimerPicker"
  | "DropPicker"
  | "maxParticipantsPicker"
  | "hidden"
  | "string"; //default

export interface ActivityFormSchema {
  value: ActivityType;
  initialValue?: number | string | boolean | Date | any[];
  validation: FieldValidation;
}

export type ActivityType = "sport" | "location" | "date" | "startHour" | "endHour" | "maxParticipants" | "description";
