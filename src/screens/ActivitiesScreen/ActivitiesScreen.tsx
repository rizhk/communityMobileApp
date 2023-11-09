import { PinOutline } from "assets/svg";
import { Button } from "components/Button";
import GForm from "components/GForm/GForm";
import { Modal } from "components/Modal";
import { Text } from "components/Text";
import { Validations } from "constants/Validations";
import { MainLayout } from "layout";
import { useState } from "react";
import { View } from "react-native";
import { range } from "utils/rangeItem";
import * as Yup from "yup";

type ValuesType = {
  name: string;
  nbParticipants: number;
};

const initialValues: ValuesType = {
  name: "",
  nbParticipants: 0,
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
      <Button
        text="test"
        icon={PinOutline}
        onPress={() => setOpen(true)}
        style={{ width: 150, alignSelf: "center" }}
      />
      <Modal visible={open} setVisible={setOpen}>
        <Text text="test ∞" />
        <GForm
          initialValues={initialValues}
          validationSchema={validations}
          onSubmit={(values: ValuesType) => console.log(values)}
        >
          <GForm.TextInput valName="name" text="name" />
          <GForm.NumberPicker
            values={range(0, 10, 1, true)}
            selectedIndex={0}
            valName="nbParticipants"
            text="nb participant"
          />
          <GForm.SubmitButton text="test" />
        </GForm>
      </Modal>
    </MainLayout>
  );
}
