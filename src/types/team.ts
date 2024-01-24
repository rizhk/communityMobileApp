import { ImageItem, PaginationMeta } from "./global";

export interface TeamIteam {
  id: number;
  name: string;
  icon: ImageItem;
  data: any;
}

export interface TeamsData {
  data: TeamIteam[];
  meta: PaginationMeta;
}
