import { PaginationMeta } from "./global";
import { SportItem } from "./sport";
import { UserItem } from "./user";

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

export interface FieldsData {
  data: FieldItem[];
  meta: PaginationMeta;
}
