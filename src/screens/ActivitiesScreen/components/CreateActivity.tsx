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
import { t } from "i18n-js";
import { mutate } from "swr";
import { LocationType } from "types/global";
import { formatHour } from "utils/helper";
import * as Yup from "yup";

type ValuesType = {
  description: string;
  sport: string;
  type: string;
  dateStart: Date;
  dateEnd: Date;
  nbParticipant: number;
  location: LocationType;
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

const initialValues: ValuesType = {
  description: "",
  sport: "",
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
  // const handleSubmit = (values: ValuesType) => {
  //   //TODO: replace by api request
  //   console.log(values);
  // };

  type ValuesType = {
    description: string;
    sport: number;
    type: string;
    date: Date;
    startHour: Date;
    endHour: Date;
    dateEnd: Date;
    nbParticipant: number;
    location: LocationType;
    [key: string]: any; // Add index signature
  };

  const handleSubmit = async (values: ValuesType) => {
    try {
      const formattedValues = {
        name: "Tour de foot aniamaux",
        description: "Du foot pour les aniamauxs",
        // latitude: 46.8212,
        // longitude: 7.7221,
        latitude: values.location.latitude,
        longitude: values.location.longitude,
        location: "Route des avions 1, 1260 Nyon",
        date: new Date(),
        startHour: formatHour(new Date().setHours(9, 0, 0, 0)),
        endHour: formatHour(new Date().setHours(16, 0, 0, 0)),
        maxParticipants: 15,
        author: {
          id: 40,
        },
        // author: 42,
        // author: [45],
        sport: [2],

        // sport: [10], // Assuming values.sport is a string that can be parsed as a number

        // // description: values.description,
        // // type: values.type,
        // description: "Du foot pour les aniamauxs",
        // latitude: 46.8212,
        // longitude: 7.7221,
        // location: "Route des avions 1, 1260 Nyon",

        // date: new Date(),
        // startHour: formatHour(new Date().setHours(9, 0, 0, 0)),
        // endHour: formatHour(new Date().setHours(16, 0, 0, 0)),
        // // date: values.dateStart.toISOString().split("T")[0], // Format: YYYY-MM-DD
        // // // startHour: values.dateStart.toISOString().split("T")[1],
        // // // endHour: values.dateEnd.toISOString().split("T")[1],
        // // startHour: "20:34:58.000",
        // // endHour: "21:04:58.000",
        // maxParticipants: values.nbParticipant,
        // author: {
        //   id: 46,
        // },
        // Add any other fields required by your API
      };

      // const formattedValues: any = {
      //   name: "Tour de foot aniamaux",
      //   description: "Du foot pour les aniamauxs",
      //   latitude: 46.8212,
      //   longitude: 7.7221,
      //   location: "Route des avions 1, 1260 Nyon",
      //   date: new Date(),
      //   startHour: formatHour(new Date().setHours(9, 0, 0, 0)),
      //   endHour: formatHour(new Date().setHours(16, 0, 0, 0)),
      //   maxParticipants: 15,
      //   author: {
      //     id: 40,
      //   },
      //   // author: 42,
      //   // author: [45],
      //   sport: [1],
      // };

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

  const handleSubmit3 = async (values: ValuesType) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      // Rest of the code...
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
          <GForm.DropPicker
            tx="createActivity.sportPicker"
            placeholderTx="createActivity.sportPicker"
            searchPlaceholder="Search a Sport"
            valName="sport"
            items={sportItems}
          />
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
