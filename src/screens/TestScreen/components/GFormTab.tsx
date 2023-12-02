import { Star } from "assets/svg";
import { Button } from "components/Button";
import GForm from "components/GForm/GForm";
import { Icon } from "components/Icon";
import { Popup } from "components/Modal";
import { Text } from "components/Text";
import { Scroll } from "components/containers/Scroll";
import { format } from "date-fns";
import { useState } from "react";
import { ViewStyle } from "react-native";
import { View } from "react-native-animatable";
import { color, radius, spacing } from "theme";
import { shadowStyle } from "theme/styles";

const initialValues = {
  input: "",
  switch: false,
  number: 5,
  radio: "item1",
  startDate: new Date(),
  endDate: new Date(),
  location: { latitude: 0, longitude: 0 },
  drop: "drop-item1",
};

const RadioItems = [
  { label: "item1", value: "item1" },
  { label: "item2", value: "item2" },
  { label: "item3", value: "item3" },
];

const DropItems = [
  { icon: () => <Icon icon={Star} />, label: "drop-item1", value: "drop-item1" },
  { icon: () => <Icon icon={Star} />, label: "drop-item2", value: "drop-item2" },
  { icon: () => <Icon icon={Star} />, label: "drop-item3", value: "drop-item3" },
];

function Line({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text>{label}: </Text>
      <Text>{value}</Text>
    </View>
  );
}

export default function GFormTab() {
  const [popup, setPopup] = useState(false);
  const [values, setValues] = useState(initialValues);
  const handleSubmit = (values: any) => {
    console.log(values);
    setValues(values);
    setPopup(true);
  };

  return (
    <>
      <GForm initialValues={initialValues} onSubmit={handleSubmit} themeColor="secondary">
        <Scroll>
          <GForm.TextInput valName="input" text="TextInput" placeholder="Placeholder" />
          <GForm.AddressPicker valName="location" placeholder="Enter address" />
          <GForm.DropPicker valName="drop" text="DropPicker" items={DropItems} searchable />
          <GForm.Switch valName="switch" text="Switch" />
          <GForm.NumberPicker valName="number" text="Number" max={10} hasInfinit />
          <GForm.Radio valName="radio" text="Radio" items={RadioItems} />
          <GForm.DateTimePicker
            valNames={{ start: "startDate", end: "endDate" }}
            minDate={new Date()}
            text="DateTimePicker"
            nestedScrollEnabled
          />
          <GForm.SubmitButton text="Submit" />
        </Scroll>
      </GForm>
      <Popup visible={popup} setVisible={setPopup}>
        <Text preset="header">Modal</Text>
        <Line label="TextInput" value={values.input} />
        <Line label="Switch" value={values.switch.toString()} />
        <Line label="Number" value={values.number.toString()} />
        <Line label="Radio" value={values.radio} />
        <Line label="startDate" value={format(values.startDate, "dd/MM/yyyy HH:mm")} />
        <Line label="endDate" value={format(values.endDate, "dd/MM/yyyy HH:mm")} />
        <Line label="location" value={JSON.stringify(values.location)} />
      </Popup>
    </>
  );
}

const modalStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#7772",
} as ViewStyle;

const container = {
  padding: spacing.md,
  borderRadius: radius.md,
  backgroundColor: color.grey700,
  ...shadowStyle,
  shadowRadius: 10,
  width: "80%",
} as ViewStyle;
