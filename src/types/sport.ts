import { number, object, string } from "yup";
import { ImageItem, PaginationMeta } from "./global";

export interface SportItem {
  id: number;
  name: string;
  icon: ImageItem;
}

export interface SportsData {
  data: SportItem[];
  meta: PaginationMeta;
}

//generate sportIteamSchema with yup
export const sportItemSchema = object({
  id: number().required().positive().integer(),
  name: string(),
  // icon: imageItemSchema.required(),
});
