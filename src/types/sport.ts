import { ImageItemStrapi } from "./activity";

export interface SportItem {
  id: number;
  name: string;
  icon: ImageItemStrapi;
  data: any;
}

export interface SportItemStrapi {
  id: number;
  attributes: SportItem;
}

export interface SportsData {
  data: SportItemStrapi[];
  meta: any;
}
