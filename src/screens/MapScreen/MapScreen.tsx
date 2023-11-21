import { Button } from "components/Button";
import { Scroll, useScrollContext } from "components/GForm/components/containers/Scroll";
import { Text } from "components/Text";
import { MainLayout } from "layouts";
import { useState } from "react";
import { FlatList, ScrollView } from "react-native";
import AppWheel, { item } from "./AppWheel";
import { View } from "react-native-animatable";

const items: item[] = [
  { value: "1", label: "one" },
  { value: "2", label: "two" },
  { value: "3", label: "three" },
  { value: "4", label: "four" },
  { value: "5", label: "five" },
  { value: "6", label: "six" },
  { value: "7", label: "seven" },
  { value: "8", label: "eight" },
];
export default function MapScreen() {
  const [val, setVal] = useState("1");
  return (
    <MainLayout>
      <Text>MapScreen</Text>
      {/* <Scroll style={{ backgroundColor: "pink" }}></Scroll> */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <AppWheel
          value={val}
          setValue={setVal}
          items={items}
          style={{ width: 80, marginHorizontal: "auto" }}
        />
      </View>
    </MainLayout>
  );
}
