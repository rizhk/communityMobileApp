import { postAxiosApiFormData } from "api/api";
import { Star } from "assets/svg";
import GForm from "components/GForm/GForm";
import { DropPickerItem } from "components/GForm/components/DropPicker";
import { Icon } from "components/Icon";
import { KeyboardAvoiding } from "components/KeyboardAvoidind";
import { Slider } from "components/Modal";
import { Text } from "components/Text";
import { Validations } from "constants/Validations";
import { INFINIT_PARTICIPANTS } from "constants/global";
import { format } from "date-fns";
import { t } from "i18n-js";
import { mutate } from "swr";
import { LocationType } from "types/global";
import { formatHour } from "utils/helper";
import * as Yup from "yup";

type ActivityFormType = {
  description: string;
  // sport: [number]; //right
  sport: string; //TODO: replace by [number];
  type: string;
  dateStart: Date;
  dateEnd: Date;
  // startHour: Date;
  // endHour: Date;
  // dateEnd: Date;
  nbParticipant: number;
  location: LocationType;
  [key: string]: any; // Add index signature
};

const activityTypeItems = [
  { value: "solo", label: "createActivity.solo" },
  { value: "private", label: "createActivity.private" },
  { value: "public", label: "createActivity.public" },
];
//TODO: replace by sportItems
const sportItems: DropPickerItem[] = [
  { icon: () => <Icon icon={Star} />, value: "1box", label: t("sports.Boxe") },
  { icon: () => <Icon icon={Star} />, value: "2bowling", label: t("sports.Bowling") },
  { icon: () => <Icon icon={Star} />, value: "3bouldering", label: t("sports.Bouldering") },
  { icon: () => <Icon icon={Star} />, value: "4soccer", label: t("sports.Soccer") },
  { icon: () => <Icon icon={Star} />, value: "5box", label: t("sports.Boxe") },
  { icon: () => <Icon icon={Star} />, value: "6bowling", label: t("sports.Bowling") },
  { icon: () => <Icon icon={Star} />, value: "7bouldering", label: t("sports.Bouldering") },
  { icon: () => <Icon icon={Star} />, value: "8soccer", label: t("sports.Soccer") },
  { icon: () => <Icon icon={Star} />, value: "9box", label: t("sports.Boxe") },
  { icon: () => <Icon icon={Star} />, value: "10bowling", label: t("sports.Bowling") },
  { icon: () => <Icon icon={Star} />, value: "11bouldering", label: t("sports.Bouldering") },
  { icon: () => <Icon icon={Star} />, value: "11soccer", label: t("sports.Soccer") },
  { icon: () => <Icon icon={Star} />, value: "12box", label: t("sports.Boxe") },
  { icon: () => <Icon icon={Star} />, value: "13bowling", label: t("sports.Bowling") },
  { icon: () => <Icon icon={Star} />, value: "14bouldering", label: t("sports.Bouldering") },
  { icon: () => <Icon icon={Star} />, value: "15soccer", label: t("sports.Soccer") },
];

const nowMoreOneHour = () => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  return now;
};

const initialValues: ActivityFormType = {
  description: "",
  sport: "2",
  type: "solo",
  dateStart: new Date(),
  dateEnd: nowMoreOneHour(),
  nbParticipant: INFINIT_PARTICIPANTS,
  location: { latitude: 0, longitude: 0 },
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
  // const handleSubmit = (values: ActivityFormType) => {
  //   //TODO: replace by api request
  //   console.log(values);
  // };

  const handleSubmit = async (values: ActivityFormType) => {
    console.log(values, "values");

    const startHour = format(values.dateStart, "HH:mm:ss.SSS"); // Formats to hour, minute, second, and milliseconds
    const endHour = format(values.dateEnd, "HH:mm:ss.SSS");
    try {
      const formattedValues = {
        description: values.description,

        latitude: values.location.latitude,
        longitude: values.location.longitude,
        location: "", //TODO: replace by location name

        startHour: format(values.dateStart, "HH:mm:ss.SSS"),
        endHour: format(values.dateEnd, "HH:mm:ss.SSS"),
        date: values.dateStart, //TODO: Bug date jour avant, on avait déjà eu ça je

        maxParticipants: values.nbParticipant,
        author: {
          id: 40, //TODO: replace by user id
        },
        sport: [3], //TODO: replace by sport id
        // type: values.type,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(formattedValues));

      console.log(formData, "formData");

      const response = await postAxiosApiFormData("/activities", formData);

      // Here we call `mutate` to revalidate the local data and update the list of activities
      mutate("/activities");

      // mutate("/activities", (cachedData) => {
      //   // Supposant que cachedData est un tableau d'activités
      //   return [...cachedData, { ...values, id: response.data.id }]; // Ajoutez la nouvelle activité avec l'ID retourné
      // }, false);

      console.log(response);
    } catch (error) {
      console.error("Failed to create activity", error);
    }
  };

  return (
    <KeyboardAvoiding>
      <Slider visible={open} setVisible={setOpen}>
        <Text preset="header" tx="createActivity.title" />
        <GForm initialValues={initialValues} validationSchema={validations} onSubmit={handleSubmit}>
          <GForm.TextInput
            tx="createActivity.activityDescription"
            valName="descirption"
            placeholderTx="createActivity.descriptionPlaceholder"
          />
          <GForm.SportPicker
            tx="createActivity.sportPicker"
            placeholderTx="createActivity.sportPicker"
            searchPlaceholder="Search a Sport"
            valName="sport"
          />
          {/* <GForm.DropPicker
            tx="createActivity.sportPicker"
            placeholderTx="createActivity.sportPicker"
            searchPlaceholder="Search a Sport"
            valName="sport"
            items={sportItems}
          /> */}
          <GForm.AddressPicker valName="location" />
          <GForm.DateTimePicker
            tx="createActivity.when"
            valNames={{ start: "dateStart", end: "dateEnd" }}
            minDate={new Date()}
          />
          <GForm.Radio valName="type" items={activityTypeItems} />
          <GForm.NumberPicker max={10} tx="createActivity.maxParticipant" valName="nbParticipant" />
          <GForm.SubmitButton tx="createActivity.createActivity" style={{ alignSelf: "center" }} />
        </GForm>
      </Slider>
    </KeyboardAvoiding>
  );
}
