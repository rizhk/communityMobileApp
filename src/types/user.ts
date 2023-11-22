import { ActivityItem } from "./activity";
import { SportItem } from "./sport";

export interface UserItem {
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
