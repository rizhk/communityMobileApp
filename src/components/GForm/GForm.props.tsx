import { FormikErrors } from "formik";
import i18n from "i18n-js";
import { createContext, useContext } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { ThemeColorType } from "theme";

export type GFieldProps = {
  valName: string;
  tx?: I18n.Scope;
  text?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export type GFormProps = {
  txOptions?: i18n.TranslateOptions;
  containerStyle?: StyleProp<ViewStyle>;
  themeColor?: ThemeColorType;
};

type ContextProps = {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  };
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>;
  handleSubmit: (e: any) => void;
  values: { [key: string]: any };
  errors: any;
  setFieldError: (field: string, error: string) => void;
  validateField: (e: any) => void;
  themeColor?: ThemeColorType;
};

export const GFormContext = createContext<ContextProps>({} as ContextProps);
export const useGForm = () => useContext(GFormContext);
