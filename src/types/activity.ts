import { SportItem, SportItemStrapi, SportsData } from "./sport";
import { UserItem } from "./user";
import { object, string, number, date, InferType } from "yup";

export const populateActivity = [
  "cover",
  "author",
  "author.avatar",
  "author.blockedUsers",
  "participants",
  "participants.avatar",
  "sport",
  "sport.icon",
  "sport.localizations",
  "channel",
  "blockedUsers",
];

//****** ACTIVITY ******\\
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

export interface ActivityItem2 {
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
  sport:  SportItem ;
  channel: any;
}

//TODO normalement plus utilisé
export interface ActivityItemStrapi {
  id: number;
  attributes: ActivityItem;
}

export interface ActivitiesData {
  data: ActivityItem[];
  meta: any;
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

//****** IMAGE ******\\
export interface ImageItem {
  public_id: string;
  url: string;
}
//TODO normalement plus utile
export interface ImageItemStrapi {
  data: {
    id: number;
    attributes: ImageItem;
  };

  provider_metadata: ImageItem;
  id: number;
}

//****** FIELD ******\\
export interface FieldItem {
  sports: SportItem;
  certified: boolean;
  author: UserItem;
  contactNumber: string;
  contactWebSite: string;
  description: string;
  images: any;
  latitude: number;
  longitude: number;
  nbrField: number;
  name: string | null;
  status: "public" | "semi-private" | "private";
  disponibility?: string;
}
export interface FieldItemStrapi {
  id: number;
  attributes: FieldItem;
}

//****** TOURNAMENT ******\\
export interface TournamentItem {
  maxParticipants?: number;
  latitude: number;
  longitude: number;
  date: Date;
  startHour?: string;
  endHour?: string;
  location?: string;
  description?: string;
  author?: {
    data?: {
      id: number;
    };
    id?: number;
  };
  participants?: {
    id?: number;
    data?: {
      id: number;
    }[];
  };
  sport?: SportItemStrapi | SportsData;
  maxTeam?: number;
  teams?: any;
  maxTeamParticipant?: number;
}

export interface TournamentItemStrapi {
  id: number;
  attributes: TournamentItem;
}

export type FieldValidation = {
  type: string;
  required?: boolean;
  minLength?: number;
  min?: number;
  maxLenght?: number;
  format?: string;
};

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
