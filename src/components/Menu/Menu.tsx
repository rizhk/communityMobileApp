import { BurgerMenu } from "assets/svg";
import { Button } from "components/Button";
import { XStack, YStack } from "components/containers";
import { useState } from "react";
import { buttonSize } from "theme";

const menuItems = [
  { text: "Item 1", type: "action", action: () => console.log("Item 1") },
  { text: "Item 2", type: "action", action: () => console.log("Item 2") },
  { text: "Item 3", type: "action", action: () => console.log("Item 3") },
  { text: "Item 4", type: "action", action: () => console.log("Item 4") },
];

export function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button rounded color="grey400" iconScale={1.2} size="md" icon={BurgerMenu} onPress={() => setOpen(!open)} />
      <YStack position="absolute" bc="tertiary" top={buttonSize.md} right={0}>
        {open &&
          menuItems.map((item) => (
            <XStack key={item.text}>
              <Button
                text={item.text}
                onPress={() => {
                  item.action();
                  setOpen(false);
                }}
                preset="plainText"
                color="grey400"
              />
            </XStack>
          ))}
      </YStack>
    </>
  );
}
