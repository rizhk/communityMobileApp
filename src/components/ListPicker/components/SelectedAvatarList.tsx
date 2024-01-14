import { AddCircle } from "assets/svg";
import { ButtonPresets } from "components/Button/button.presets";
import { XStack } from "components/containers";
import { TouchableOpacity, ViewStyle } from "react-native";
import { ButtonSizeTypes, ThemeColorType } from "theme";
import { color as themeColor } from "theme";
import { ListItemType } from "./ListItem";

export type SelectedListBadgeProps = {
  value: any;
  selectColor: ThemeColorType;
  color: ThemeColorType;
  handleSelect: (value: any) => void;
  multiple: boolean;
  setOpen: (value: boolean) => void;
  items: ListItemType[];
};

function Avatar(props: { image?: JSX.Element; text: string; color: ThemeColorType }) {
  const { image, text, color } = props;
  return (
    <XStack ai="center" jc="center" gap="xxs">
      {image}
    </XStack>
  );
}

export function SelectedAvatarList(props: SelectedListBadgeProps) {
  const { color, selectColor, value, handleSelect, multiple, setOpen, items } = props;
  const selectedProps = { preset: "badge" as ButtonPresets, color: selectColor, size: "xs" as ButtonSizeTypes };
  const addProps = { ...selectedProps, color: color, style: { width: multiple ? undefined : "100%" } as ViewStyle };

  return (
    <XStack ai="center" jc="center" flexWrap={multiple ? "wrap" : undefined} gap="sm">
      {!multiple && props.value !== "" && (
        <Avatar image={items.find((item) => item.value === value)?.icon} text={value} color={color} />
      )}
      {multiple &&
        props.value.map((value: any, index: number) => (
          <Avatar image={items.find((item) => item.value === value)?.icon} text={value} color={color} />
        ))}
      {(multiple || props.value === "") && (
        <TouchableOpacity onPress={() => setOpen(true)}>
          <AddCircle fill={themeColor[color]} height={30} width={30} />
        </TouchableOpacity>
      )}
    </XStack>
  );
}
