import { ActivityItem, activityItemSchema } from "./activity";
import { SportItem } from "./sport";
import { object, string, number, date, InferType, lazy, boolean, array } from "yup";

export interface UserItemOld {
  id: number;
  username?: string;
  email?: string;
  provider?: string;
  password?: string;
  resetPasswordToken?: string;
  confirmationToken?: string;
  confirmed?: boolean;
  blocked?: boolean;
  firstName?: string;
  lastName?: string;
  followers?: UserItem[];
  followings?: UserItem[];
  avatar?: MediaItem;
  activitiesParticipate?: ActivityItem[];
  favoriteSports?: SportItem[];
  // value: number | string;
  // category?: string;
  // attributes: any;
  // label: string;
}

const userItemSchema: any = lazy(() =>
  object({
    id: number().required().positive().integer(),
    username: string().nullable(),
    email: string().email().nullable(),
    provider: string().nullable(),
    password: string().nullable(),
    resetPasswordToken: string().nullable(),
    confirmationToken: string().nullable(),
    confirmed: boolean().nullable(),
    blocked: boolean().nullable(),
    firstName: string().nullable(),
    lastName: string().nullable(),
    followers: array().of(userItemSchema).nullable(),
    followings: array().of(userItemSchema).nullable(),
    // avatar: mediaItemSchema.nullable(),
    activitiesParticipate: array().of(activityItemSchema).nullable(),
    // favoriteSports: array().of(sportItemSchema).nullable(),
    // Other fields as necessary
  })
);

export type UserItem = InferType<typeof userItemSchema>;

export interface UserItemStrapi {
  id: number;
  attributes: UserItem;
}

export interface UsersData {
  data: UserItemStrapi[];
  meta: any;
}

export interface MediaItem {
  id?: string;
  url?: string;
  provider_metadata?: any;
  // Define the properties of MediaItem here
  // ...
}
