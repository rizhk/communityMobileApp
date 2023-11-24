import GForm from "components/GForm/GForm";
import { Scroll } from "components/GForm/components/containers/Scroll";
import { Modal } from "components/Modal";
import { INFINIT_PARTICIPANTS } from "constants/global";
import * as Yup from "yup";
import { Validations } from "constants/Validations";
import { rangedItems } from "utils/formHelper";

type ValuesType = {
  textInput: string;
  numberPicker: number;
  radioInput: string;
  switch: boolean;
  dateStart: Date;
  dateEnd: Date;
};

const testVals = [
  { value: "box", label: "sports.Boxe" },
  { value: "bowling", label: "sports.Bowling" },
  { value: "bouldering", label: "sports.Bouldering" },
  { value: "soccer", label: "sports.Soccer" },
  { value: "soccer", label: "sports.Soccer" },
];

const nowMoreOneHour = () => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  return now;
};

const initialValues: ValuesType = {
  textInput: "",
  numberPicker: INFINIT_PARTICIPANTS,
  radioInput: "kikou",
  switch: true,
  dateStart: new Date(),
  dateEnd: nowMoreOneHour(),
};

const validations = Yup.object().shape({
  // name: Validations.emailRequired,
  textInput: Validations.name,
  numberPicker: Validations.number,
});

type CreateActivityProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateActivity(props: CreateActivityProps) {
  const { open, setOpen } = props;
  return (
    <Modal visible={open} setVisible={setOpen}>
      <GForm
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={(values: ValuesType) => {
          console.log(values);
        }}
      >
        <Scroll>
          <GForm.TextInput text="TextInputFIeld" valName="textInput" />
          <GForm.DateTimePicker text="DateTimePicker" valNames={{ start: "dateStart", end: "dateEnd" }} />
          <GForm.NumberPicker
            items={rangedItems(0, 10, 0, 1, true)}
            text="numberPicker"
            valName="numberPicker"
          />
          <GForm.Radio items={testVals} text="Radio Field" valName="kikou" />
          <GForm.Switch text="Switch" valName="switch" />
          <GForm.SubmitButton text="SubmitButton" />
        </Scroll>
      </GForm>
    </Modal>
  );
}
