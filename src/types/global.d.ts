type ImageUpload = { uri: string } | string | null | any;

export type LocationType = {
  longitude: number;
  latitude: number;
};

export type ItemType<T> = {
  value: T;
  label: I18n.Scope;
};

export type ValueType = string | number | boolean;
