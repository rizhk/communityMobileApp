import { ImageItem } from "./activity";

export interface SportItem {
  id: number;
  name: string;
  icon: ImageItem;
  data: any;
}
//TODO normalement plus utile
export interface SportItemStrapi {
  id: number;
  attributes: SportItem;
}

export interface SportsData {
  data: SportItemStrapi[];
  meta: any;
}
