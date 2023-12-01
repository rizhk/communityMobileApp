import { Star } from "assets/svg";
import { Button } from "components/Button";
import { View } from "react-native";

export default function GeneralTab() {
  return (
    <View style={{ flex: 1 }}>
      <Button text="Button default" />
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
    </View>
  );
}
