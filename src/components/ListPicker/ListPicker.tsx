import { Button } from "components/Button";
import { Slider } from "components/Modal";
import { Stack, XStack } from "components/containers";
import { SVGAttributes, useState } from "react";
import { ButtonSizeTypes, ThemeColorType, buttonSize } from "theme";
import ListItem, { ListItemType } from "./components/ListItem";
import { i18n } from "i18n";
import { ButtonPresets } from "components/Button/button.presets";

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
  const selectedProps = { preset: selectedView as ButtonPresets, color: selectColor, size: "xs" as ButtonSizeTypes };
  const addProps = { ...selectedProps, color: color };

  const checkSelected = (value: any | any[], itemValue: any) => {
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

  return (
    <Stack style={{ backgroundColor: "#ff93" }}>
      <XStack ai="center" flexWrap="wrap" gap="sm" pa="xxs">
        {!multiple && <Button text={props.value} {...selectedProps} />}
        {multiple && props.value.map((value: any, index: number) => <Button text={value} {...selectedProps} />)}
        <Button tx={addTx} text={addText} onPress={() => setOpen(true)} {...addProps} />
      </XStack>
      <Slider visible={open} setVisible={setOpen} color={color}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            {...item}
            isSelected={checkSelected(props.value, item.value)}
            color={color}
            onPress={() => handleSelect(item.value)}
          />
        ))}
      </Slider>
    </Stack>
  );
}
