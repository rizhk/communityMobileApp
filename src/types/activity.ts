import { Region } from "react-native-maps";
import { FieldValidation } from "./global";
import { PaginationMeta, restQueryParams } from "./global";
import { SportItem, sportItemSchema } from "./sport";
import { UserItem, userItemSchema } from "./user";
import { object, string, number, date, InferType, array } from "yup";

//****** ACTIVITY ******\\

export type ActivityQueryParams = restQueryParams & {
  filters?: ActivityFilters;
};

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
  // maxDistance?: number;
}

//YUP Schema
export const activityItemSchema = object({
  id: number().positive().integer(),
  name: string(),
  maxParticipants: number().required().positive().integer(),
  date: date(),
  dateStart: date().required(),
  dateEnd: date().required(),
  latitude: number().required(),
  longitude: number().required(),
  location: string(),
  description: string(),
  author: userItemSchema,
  type: string().oneOf(["solo", "private", "public"]).required(),
  participants: array().of(userItemSchema),
  blockedUsers: array().of(userItemSchema),
  sport: array().of(sportItemSchema),
});

export type ActivityItem = InferType<typeof activityItemSchema>;

export type ActivityFormValues = Omit<ActivityItem, "sport"> & {
  sport: number;
};

//Deprecated
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
  sport: SportItem[];
  channel: any;
}

export interface ActivitiesData {
  data: ActivityItem[];
  meta: PaginationMeta;
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

export type ActivityType = "sport" | "location" | "date" | "startHour" | "endHour" | "maxParticipants" | "description";
