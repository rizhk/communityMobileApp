import { AddCircle } from "assets/svg";
import { Button } from "components/Button";
import { Slider } from "components/Modal";
import { Text } from "components/Text";
import { Stack, XStack } from "components/containers";
import { useState } from "react";
import { ThemeColorType } from "theme";
import ListItem, { ListItemType } from "./components/ListItem";

export type ListPickerProps = {
  // children: React.ReactNode;
  iconColor?: ThemeColorType;
  items: ListItemType[];
};

export default function ListPicker(props: ListPickerProps) {
  const { iconColor = "primary", items } = props;
  const [open, setOpen] = useState(false);

  return (
    <Stack bc="tertiary">
      <Text>Test</Text>
      <XStack jc="center" ai="center">
        <Button
          rounded
          size="xl"
          iconScale={2.9}
          icon={AddCircle}
          color="transparent"
          iconColor={iconColor}
          onPress={() => setOpen(true)}
        />
      </XStack>
      <Slider visible={open} setVisible={setOpen}>
        {items.map((item, index) => (
          <ListItem key={index} {...item} />
        ))}
      </Slider>
    </Stack>
  );
}
