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
  startDate: date().required(),
  endDate: date().required(),
  latitude: number().required(),
  longitude: number().required(),
  location: string(),
  description: string(),
  author: userItemSchema.required(),
  // type: string().oneOf(["solo", "private", "public"]), //TODO: Il y a une erreur avec ça
  participants: array().of(userItemSchema),
  blockedUsers: array().of(userItemSchema),
  sport: sportItemSchema.required(),
  // sport: array().of(sportItemSchema).required(),
});

export type ActivityItem = InferType<typeof activityItemSchema>;

export type ActivityFormValues = Omit<ActivityItem, "sport"> & {
  sport: number;
};

export interface ActivitiesData {
  data: ActivityItem[];
  meta: PaginationMeta;
}
