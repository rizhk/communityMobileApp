import { useState } from "react";
import useSWR from "swr";
import { fetchSports } from "api/api";
import { Image, StyleSheet } from "react-native";
import { DropPicker as AppDropPicker } from "components/Inputs";
import { t } from "i18n-js";
import { GFieldProps, useGForm } from "../GForm.props";
import { BaseField } from "./BaseField";
import { SportsData } from "types/sport";
import { GrowingView } from "components/containers/GrowingView";

// Convert this to use your custom DropPickerProps type if needed
// interface SportPickerProps {
//   valName: string; // this is the name of the field in Formik values
//   placeholderTx?: string;
//   searchPlaceholderTx?: string;
// }

export type DropPickerItem = {
  icon: () => JSX.Element;
  label: string;
  value: string;
};

interface DropPickerProps extends GFieldProps {
  //   items: DropPickerItem[];
  placeholder?: string;
  placeholderTx?: string;
  searchPlaceholder?: string;
  searchPlaceholderTx?: string;
  searchable?: boolean;
}

const mapSportsDataToDropPickerItems = (sportsData: SportsData) => {
  return sportsData?.data?.map((sport) => ({
    icon: () => (
      <Image source={{ uri: sport.attributes.icon.data.attributes.url }} resizeMode="contain" style={styles.pinImage} />
    ),
    label: sport?.attributes?.name,
    value: String(sport.id),
  }));
};

export default function SportPicker({
  tx,
  text,
  valName,
  placeholderTx,
  searchPlaceholderTx,
  placeholder,
  searchPlaceholder,
}: DropPickerProps) {
  const { values, setFieldValue, themeColor } = useGForm();
  const [value, setValue] = useState(values[valName]);
  console.log(value, "valueseeae");
  const [open, setOpen] = useState(false);
  const placeholderF = (placeholderTx && t(placeholderTx)) || placeholder || "";
  const searchPlaceholderF = (searchPlaceholderTx && t(searchPlaceholderTx)) || searchPlaceholder || "";

  const { data: dataSports } = useSWR(["sports"], () => fetchSports());
  const items = dataSports ? mapSportsDataToDropPickerItems(dataSports) : [];

  return (
    <BaseField>
      <BaseField.Label tx={tx} text={text} />
      <GrowingView from={35} to={210} open={open}>
        <AppDropPicker
          items={items}
          open={open}
          setOpen={setOpen}
          value={value}
          onChangeValue={() => setFieldValue(valName, value)}
          setValue={setValue}
          searchable={true}
          color={themeColor}
          placeholder={placeholderF}
          searchPlaceholder={searchPlaceholderF}
        />
      </GrowingView>
    </BaseField>
  );
}

const styles = StyleSheet.create({
  pinImage: {
    width: 24,
    height: 24,
  },
});
