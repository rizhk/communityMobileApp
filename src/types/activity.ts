import { SportItem, SportItemStrapi, SportsData } from "./sport";
import { UserItem } from "./user";

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
    name: string;
  };
  date?: string;
}

export interface ActivityItem {
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
  participants: { data: UserItem[] };
  blockedUsers: { data: UserItem[] };
  sport: SportItem;
  channel: any;
}

export interface ActivityItemStrapi {
  id: number;
  attributes: ActivityItem;
}

export interface ActivitiesData {
  data: ActivityItemStrapi[];
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
  initialValue?: number | string | boolean | Date | Array<any>;
  validation: FieldValidation;
}

export type ActivityType = "sport" | "location" | "date" | "startHour" | "endHour" | "maxParticipants" | "description";

//****** IMAGE ******\\
export interface ImageItem {
  public_id: string;
  url: string;
}
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
