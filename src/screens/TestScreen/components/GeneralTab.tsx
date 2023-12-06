import { Star } from "assets/svg";
import { Button } from "components/Button";
import { Popup, Slider } from "components/Modal";
import { SideSlider } from "components/Modal/SideSlider";
import { Text } from "components/Text";
import { XStack, YStack } from "components/containers/Stack";
import { useState } from "react";
import { View } from "react-native";

import ColorPicker from "./ColorPicker";
import { ThemeColorType } from "../../../theme/color";

export default function GeneralTab() {
  const [slider, setSlider] = useState(false);
  const [leftSlider, setLeftSlider] = useState(false);
  const [rightSlider, setRightSlider] = useState(false);
  const [color, setColor] = useState("primary" as ThemeColorType);
  const [textColor, setTextColor] = useState("white" as ThemeColorType);
  const [popup, setPopup] = useState(false);
  return (
    <YStack gap="sm" flexGrow jc="space-between">
      <ColorPicker setColor={setColor} setTextColor={setTextColor} />
      <Text preset="header" color={textColor}>
        Text Header
      </Text>
      <Text color={textColor}>Text default</Text>
      <Text preset="bold" color={textColor}>
        Text bold
      </Text>
      <Button text="Default Button" color={color} textColor={textColor} />
      <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap" }}>
        <Button text="Button xs" size="xs" preset="outlined" color="white" style={{ alignSelf: "center" }} />
        <Button text="Button sm" size="sm" preset="outlined" color="secondary" />
        <Button text="Button md" size="md" color="secondary" style={{ alignSelf: "center" }} />
        <Button text="Button lg" size="lg" color="tertiary" style={{ alignSelf: "center" }} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
        <Button icon={Star} rounded />
        <Button icon={Star} rounded size="xs" />
        <Button icon={Star} rounded size="sm" />
        <Button icon={Star} rounded size="md" color="secondary" />
        <Button icon={Star} rounded size="lg" color="tertiary" />
        <Button icon={Star} rounded size="xl" />
      </View>
      <XStack gap="sm">
        <Button text="Popup" onPress={() => setPopup(true)} style={{ flex: 1 }} color={color} textColor={textColor} />
        <Button text="Slider" onPress={() => setSlider(true)} style={{ flex: 1 }} color={color} textColor={textColor} />
      </XStack>
      <XStack gap="sm">
        <Button
          text="Left Slider"
          onPress={() => setLeftSlider(true)}
          style={{ flex: 1 }}
          color={color}
          textColor={textColor}
        />
        <Button
          text="Right Slider"
          onPress={() => setRightSlider(true)}
          style={{ flex: 1 }}
          color={color}
          textColor={textColor}
        />
      </XStack>
      <Popup visible={popup} setVisible={setPopup} color="tertiary">
        <Text preset="header">Modal popup</Text>
      </Popup>
      <Slider visible={slider} setVisible={setSlider} color="secondary">
        <Text preset="header">Modal slider</Text>
      </Slider>
      <SideSlider visible={leftSlider} setVisible={setLeftSlider} width={0.7} left>
        <Text preset="header">Modal slider</Text>
        <Text preset="header">Modal slider</Text>
        <Text preset="header">Modal slider</Text>
        <Text preset="header">Modal slider</Text>
        <Text preset="header">Modal left slider</Text>
      </SideSlider>
      <SideSlider visible={rightSlider} setVisible={setRightSlider} width={0.7} right>
        <Text preset="header">Modal slider</Text>
        <Text preset="header">Modal slider</Text>
        <Text preset="header">Modal slider</Text>
        <Text preset="header">Modal slider</Text>
        <Text preset="header">Modal right slider</Text>
      </SideSlider>
    </YStack>
  );
}
