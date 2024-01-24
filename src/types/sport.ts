import { ImageItem, PaginationMeta } from "./global";

export interface SportItem {
  id: number;
  name: string;
  icon: ImageItem;
  data: any;
}

export interface SportsData {
  data: SportItem[];
  meta: PaginationMeta;
}
