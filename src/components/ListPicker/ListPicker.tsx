import { Slider } from "components/Modal";
import { Stack } from "components/containers";
import { i18n } from "i18n";
import { SVGAttributes, useState } from "react";
import { FlatList } from "react-native";
import { ThemeColorType } from "theme";

import ListItem, { ListItemType } from "./components/ListItem";
import { SelectedAvatarList } from "./components/SelectedAvatarList";
import { SelectedBadgeList } from "./components/SelectedBadgeList";

type ListPickerSingle = {
  multiple?: false;
  value: any;
  setSingle: (value: any) => void;
};

type ListPickerMultiple = {
  multiple: true;
  value: any[];
  setMultiple: (value: any[]) => void;
};

export type ListPickerProps = (ListPickerSingle | ListPickerMultiple) & {
  addText?: string;
  addTx?: i18n.Scope;
  addIcon?: React.FunctionComponent<SVGAttributes<SVGElement>>;
  selectColor?: ThemeColorType;
  items: ListItemType[];
  selectedView?: "avatar" | "badge";
  singleSet?: (value?: any) => void;
  handleUnSelect?: (value?: any) => void;
  color?: ThemeColorType;
};

export default function ListPicker(props: ListPickerProps) {
  const {
    items,
    selectedView = "badge",
    addText,
    addTx,
    multiple = false,
    color = "secondary",
    selectColor = "grey400",
  } = props;
  const [open, setOpen] = useState(false);
  const checkSelected = (value: any, itemValue: any) => {
    return multiple ? value.includes(itemValue) : value === itemValue;
  };

  const handleSelect = (value: any) => {
    if ("setMultiple" in props) {
      if (props.value.includes(value)) {
        props.setMultiple(props.value.filter((item: any) => item !== value));
      } else {
        props.setMultiple([...props.value, value]);
      }
    } else if ("setSingle" in props) {
      props.setSingle((prev: any) => (prev === value ? "" : value));
    }
  };

  const selectedListProps = { setOpen, color, selectColor, value: props.value, handleSelect, multiple };
  const selectedBadgeListProps = { addText, addTx, ...selectedListProps };
  const selectedAvatarListProps = { items, ...selectedListProps };

  return (
    <Stack>
      {selectedView === "badge" && <SelectedBadgeList {...selectedBadgeListProps} />}
      {selectedView === "avatar" && <SelectedAvatarList {...selectedAvatarListProps} />}
      <Slider visible={open} setVisible={setOpen} color={color}>
        <FlatList
          data={items}
          renderItem={({ item, index }) => (
            <ListItem
              key={index}
              {...item}
              isSelected={checkSelected(props.value, item.value)}
              color={color}
              onPress={() => handleSelect(item.value)}
            />
          )}
          keyExtractor={(item) => item.value}
          ItemSeparatorComponent={() => <Stack h={1} bc="grey300" />}
        />
      </Slider>
    </Stack>
  );
}
