import { Star } from "assets/svg";
import { Button } from "components/Button";
import { Popup, Slider } from "components/Modal";
import { Text } from "components/Text";
import { useState } from "react";
import { View } from "react-native";

export default function GeneralTab() {
  const [slider, setSlider] = useState(false);
  const [popup, setPopup] = useState(false);
  return (
    <View style={{ flex: 1, gap: 20 }}>
      <Text preset="header">Text Header</Text>
      <Text>Text default</Text>
      <Text preset="bold">Text bold</Text>
      <Button text="Default Button" />
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
      <Button text="Popup" onPress={() => setPopup(true)} />
      <Button text="Slider" onPress={() => setSlider(true)} />
      <Popup visible={popup} setVisible={setPopup} color="tertiary">
        <Text preset="header">Modal popup</Text>
      </Popup>
      <Slider visible={slider} setVisible={setSlider} color="secondary">
        <Text preset="header">Modal slider</Text>
      </Slider>
    </View>
  );
}
