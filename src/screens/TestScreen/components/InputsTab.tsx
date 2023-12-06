import { Star } from "assets/svg";
import { Icon } from "components/Icon";
import { Radio, Switch, NumberPicker, DropPicker, TextInput, DateTimePicker } from "components/Inputs";
import { AddressPicker } from "components/Inputs/AddressPicker";
import { useState } from "react";
import { ScrollView } from "react-native";
import { View } from "react-native-animatable";

const radioItems = [
  { label: "item1", value: "item1" },
  { label: "item2", value: "item2" },
  { label: "item3", value: "item3" },
];

const dropItems = [
  { icon: () => <Icon icon={Star} />, label: "drop-item1", value: "drop-item1" },
  { icon: () => <Icon icon={Star} />, label: "drop-item2", value: "drop-item2" },
  { icon: () => <Icon icon={Star} />, label: "drop-item3", value: "drop-item3" },
  { icon: () => <Icon icon={Star} />, label: "drop-item4", value: "drop-item4" },
];

export function InputsTab() {
  const [radio, setRadio] = useState("item1");
  const [switchValue, setSwitchValue] = useState(false);
  const [n, setN] = useState(0);
  const [item, setItem] = useState("drop-item1");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [address, setAddress] = useState({ latitude: 0, longitude: 0 });

  return (
    <ScrollView style={{ display: "flex", flexDirection: "column" }}>
      <TextInput placeholder="type text" style={{ marginVertical: 10 }} />
      <DropPicker items={dropItems} value={item} setValue={setItem} searchable />
      <AddressPicker value={address} setValue={setAddress} placeholder="addressPicker" style={{ marginVertical: 10 }} />
      <DateTimePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      <Radio value={radio} setValue={setRadio} items={radioItems} style={{ marginTop: 20 }} />
      <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", padding: 10, gap: 20 }}>
        <Radio value={radio} setValue={setRadio} items={radioItems} groupDirection="column" color="secondary" />
        <NumberPicker min={0} max={10} value={n} setValue={setN} hasInfinit padding={2} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", padding: 10, gap: 20 }}>
        <Switch value={switchValue} onChange={() => setSwitchValue(!switchValue)} />
        <Switch value />
        <Switch value={false} color="secondary" />
        <Switch value color="secondary" />
        <Switch value={false} color="tertiary" />
        <Switch value color="tertiary" />
      </View>
    </ScrollView>
  );
}
