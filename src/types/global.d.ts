type ImageUpload = { uri: string } | string | null | any;

export type LocationType = {
  longitude: number;
  latitude: number;
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

export interface PaginationMeta {
  pagination: {
    page?: number;
    pageSize?: number;
    pageCount: number;
    total: number;
  };
}
