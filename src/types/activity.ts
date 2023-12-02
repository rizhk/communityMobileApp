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
export interface SportItem {
  id: number;
  name: string;
  icon?: ImageItemStrapi;
  data?: any;
}

export interface UserItem {
  data?: {
    id: number;
  };
  id?: number;
}

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

export interface ImageItem {
  public_id: string;
}
export interface ImageItemStrapi {
  provider_metadata: ImageItem;
  id: number;
}

export interface ActivityItemStrapi {
  id: number;
  attributes: ActivityItem;
}

export interface ActivitiesData {
  data: ActivityItemStrapi[];
  meta: any;
}

export interface SportItemStrapi {
  id: number;
  attributes: SportItem;
}

export interface FieldItemStrapi {
  id: number;
  attributes: FieldItem;
}

export interface FieldItemStrapi {
  id: number;
  attributes: FieldItem;
}

export interface SportsData {
  data: SportItemStrapi[];
  meta: any;
}

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
