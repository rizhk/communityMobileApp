import { PinOutline } from "assets/svg";
import { Button } from "components/Button";
import GForm from "components/GForm/GForm";
import { Modal } from "components/Modal";
import { Text } from "components/Text";
import { Validations } from "constants/Validations";
import { INFINIT_PARTICIPANTS } from "constants/global";
import { MainLayout } from "layout";
import { useState } from "react";
import { range } from "utils/formHelper";
import * as Yup from "yup";

type ValuesType = {
  name: string;
  nbParticipants: number;
  sport: string;
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
            items={range(0, 10, 1, true)}
            valName="nbParticipants"
            text="nb participant"
          />
          <GForm.Radio items={testVals} valName="kikou" text="Radio Field" />
          <GForm.Radio items={testVals} valName="kikou" text="Radio Field" radioDirection="row" />
          <GForm.Radio
            items={testVals}
            valName="kikou"
            text="Radio Field"
            groupDirection="column"
          />
          <GForm.SubmitButton text="test" />
        </GForm>
      </Modal>
    </MainLayout>
  );
}
