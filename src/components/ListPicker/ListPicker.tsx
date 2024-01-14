import { AddCircle } from "assets/svg";
import { Button } from "components/Button";
import { Slider } from "components/Modal";
import { Stack, XStack } from "components/containers";
import { SVGAttributes, useState } from "react";
import { ButtonSizeTypes, ThemeColorType, buttonSize } from "theme";
import ListItem, { ListItemType } from "./components/ListItem";
import { i18n } from "i18n";
import { presets } from "components/Inputs/TextInput/TextInput.presets";
import { preset } from "swr/_internal";
import { ButtonPresets } from "components/Button/button.presets";

type ListPickerSingle = {
  multiple?: false;
  value: any;
  setValue: (value: any) => void;
};

type ListPickerMultiple = {
  multiple: true;
  value: any[];
  setValue: (value: any[]) => void;
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

  return (
    <Stack style={{ backgroundColor: "#ff93" }}>
      <XStack ai="center" flexWrap="wrap" gap="sm" pa="xxs">
        {!multiple && <Button text={props.value} {...selectedProps} />}
        {multiple && props.value.map((value: any, index: number) => <Button text={value} {...selectedProps} />)}
        <Button tx={addTx} text={addText} onPress={() => setOpen(true)} {...addProps} />
      </XStack>
      <Slider visible={open} setVisible={setOpen} color={color}>
        {items.map((item, index) => (
          <ListItem key={index} {...item} isSelected />
        ))}
      </Slider>
    </Stack>
  );
}
