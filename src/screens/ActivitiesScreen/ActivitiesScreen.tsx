import { PinOutline } from "assets/svg";
import { Button } from "components/Button";
import GForm from "components/GForm/GForm";
import { Scroll } from "components/GForm/components/containers/Scroll";
import { Modal } from "components/Modal";
import { Text } from "components/Text";
import { Validations } from "constants/Validations";
import { INFINIT_PARTICIPANTS } from "constants/global";
import { MainLayout } from "layouts";
import { useState } from "react";
import * as Yup from "yup";

type ValuesType = {
  name: string;
  nbParticipants: number;
  sport: string;
  date: Date;
};

const testVals = [
  { value: "box", label: "sports.Boxe" },
  { value: "bowling", label: "sports.Bowling" },
  { value: "bouldering", label: "sports.Bouldering" },
  { value: "soccer", label: "sports.Soccer" },
  { value: "soccer", label: "sports.Soccer" },
];

const initialValues = {
  name: "",
  nbParticipants: INFINIT_PARTICIPANTS,
  sport: "kikou",
  switch: true,
  date: new Date(),
};

const validations = Yup.object().shape({
  name: Validations.text,
  nbParticipants: Validations.number,
});

export default function ActivitiesScreen() {
  const [open, setOpen] = useState(false);
  return (
    <MainLayout>
      <Text>MapScreen</Text>
      <Text>{new Date(2002, 1, 1).toDateString()}</Text>
      <Text>{new Date(2002, 3, 1).toDateString()}</Text>
      <Text>{new Date(2002, 1, 1).toDateString()}</Text>
      <Text>{new Date(2002, 1, 1).toDateString()}</Text>
      <Button
        text="test"
        icon={PinOutline}
        onPress={() => setOpen(true)}
        style={{ width: 150, alignSelf: "center" }}
      />
      <Modal visible={open} setVisible={setOpen}>
        <GForm
          initialValues={initialValues}
          validationSchema={validations}
          onSubmit={(values: ValuesType) => console.log(values)}
        >
          <Scroll>
            <GForm.TextInput valName="name" text="name" />
            <GForm.DateTimePicker text="DatePicker" valName="date" />
            {/* <GForm.NumberPicker
              items={rangedItems(0, 10, 0, 1, true)}
              valName="nbParticipants"
              text="nb participant"
            /> */}
            <GForm.Radio items={testVals} valName="kikou" text="Radio Field" />
            <GForm.Switch valName="switch" text="Switch" />
            <GForm.SubmitButton text="test" />
          </Scroll>
        </GForm>
      </Modal>
    </MainLayout>
  );
}
