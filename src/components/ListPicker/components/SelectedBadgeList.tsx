import { Cross } from "assets/svg";
import { Button } from "components/Button";
import { ButtonPresets } from "components/Button/button.presets";
import { XStack } from "components/containers";
import { i18n } from "i18n";
import { ViewStyle } from "react-native";
import { ButtonSizeTypes, ThemeColorType } from "theme";

export type SelectedListBadgeProps = {
  value: any;
  selectColor: ThemeColorType;
  color: ThemeColorType;
  handleSelect: (value: any) => void;
  multiple: boolean;
  addText?: string;
  addTx?: i18n.Scope;
  setOpen: (value: boolean) => void;
};

export function SelectedBadgeList(props: SelectedListBadgeProps) {
  const { color, selectColor, value, handleSelect, multiple, addText, addTx, setOpen } = props;
  const selectedProps = { preset: "badge" as ButtonPresets, color: selectColor, size: "xs" as ButtonSizeTypes };
  const addProps = { ...selectedProps, color: color, style: { width: multiple ? undefined : "100%" } as ViewStyle };

  return (
    <XStack ai="center" flexWrap={multiple ? "wrap" : undefined} gap="sm" pa="xxs">
      {!multiple && props.value !== "" && (
        <Button
          text={props.value}
          {...selectedProps}
          onPress={() => handleSelect(props.value)}
          style={{ width: "100%" }}
        />
      )}
      {multiple &&
        props.value.map((value: any, index: number) => (
          <Button
            text={value}
            onPress={() => handleSelect(value)}
            icon={Cross}
            iconColor={color}
            iconScale={2}
            {...selectedProps}
          />
        ))}
      {(multiple || props.value === "") && (
        <Button tx={addTx} text={addText} onPress={() => setOpen(true)} {...addProps} />
      )}
    </XStack>
  );
}
