type ImageUpload = { uri: string } | string | null | any;

export type LocationType = {
  longitude: number;
  latitude: number;
};

export const baseSchema = object({
  title: string().required(),
  content: string(), // Assuming RTE content is a string
  contentRtM: string(), // Assuming RTE content is a string
  startDate: date(),
  endDate: date(),
});

export type BaseItem = {
  id: number;
  title: string;
  content: string;
  contentRtM: any;
  contentRTE: any;
  contentRtB: string;
  startDate: Date;
  endDate: Date;
};

export type ItemType = {
  value: ValueType;
  label: I18n.Scope;
};

export type ValueType = string | number | boolean;

//****** IMAGE ******\\
export const imageItemSchema = object({
  public_id: string(),
  url: string(),
});

export type ImageItem = InferType<typeof imageItemSchema>;

// export interface ImageItem {
//   public_id: string;
//   url: string;
// }

//****** FORM ******\\
export type FieldValidation = {
  type: string;
  required?: boolean;
  minLength?: number;
  min?: number;
  maxLenght?: number;
  format?: string;
};

//****** REQUEST ******\\
export interface restQueryParams {
  fields?: string | string[];
  filters?: object;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  sort?: string;
  populate: string | object;
  locale?: string | string[];
  publicationState?: "live" | "preview";
}

//General
export interface PaginationMeta {
  pagination: {
    page?: number;
    pageSize?: number;
    pageCount: number;
    total: number;
  };
}

export interface Data {
  data: any;
  meta: PaginationMeta;
}
