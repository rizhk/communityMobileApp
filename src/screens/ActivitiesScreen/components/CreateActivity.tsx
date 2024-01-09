import { fetchSports, postAxiosApiFormData } from "api/api";
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
import useSWR, { mutate } from "swr";
import { LocationType } from "types/global";
import { mapSportsDataToDropPickerItems } from "utils/helper";
import { fetchShortAddressFromCoords } from "utils/locationHelper";
import * as Yup from "yup";

type ActivityFormType = {
  description: string;
  // sport: [number]; //right
  sport: [number]; //TODO: replace by [number];
  type: string;
  dateStart: Date;
  dateEnd: Date;
  nbParticipant: number;
  location: LocationType;
  [key: string]: any; // Add index signature
};

const activityTypeItems = [
  { value: "solo", label: "createActivity.solo" },
  { value: "private", label: "createActivity.private" },
  { value: "public", label: "createActivity.public" },
];

const nowMoreOneHour = () => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  return now;
};

const initialValues: ActivityFormType = {
  description: "",
  //@ts-ignore
  sport: 3, //TODO: replace by [number] but it's not working
  type: "solo",
  dateStart: new Date(),
  dateEnd: nowMoreOneHour(),
  nbParticipant: INFINIT_PARTICIPANTS,
  location: { latitude: 0, longitude: 0 },
};

const validations = Yup.object().shape({
  textInput: Validations.name,
  numberPicker: Validations.number,
});

type CreateActivityProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateActivity(props: CreateActivityProps) {
  const { open, setOpen } = props;

  const { data: dataSports } = useSWR(["sports"], () => fetchSports());
  const items = dataSports ? mapSportsDataToDropPickerItems(dataSports) : [];

  const handleSubmit = async (values: ActivityFormType) => {
    const address = await fetchShortAddressFromCoords({
      latitude: values.location.latitude,
      longitude: values.location.longitude,
    });

    try {
      const formattedValues = {
        description: values.description,
        latitude: values.location.latitude,
        longitude: values.location.longitude,
        location: address,
        startHour: format(values.dateStart, "HH:mm:ss.SSS"),
        endHour: format(values.dateEnd, "HH:mm:ss.SSS"),
        date: values.dateStart, //TODO: Bug date jour avant, on avait déjà eu ça je crois
        maxParticipants: values.nbParticipant,
        author: {
          id: 40, //TODO: replace by user id
        },
        sport: [values.sport],
        type: values.type,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(formattedValues));

      const response = await postAxiosApiFormData("/activities", formData);
      // Here we call `mutate` to revalidate the local data and update the list of activities
      mutate("/activities");

      // mutate("/activities", (cachedData) => {
      //   // Supposant que cachedData est un tableau d'activités
      //   return [...cachedData, { ...values, id: response.data.id }]; // Ajoutez la nouvelle activité avec l'ID retourné
      // }, false);
    } catch (error) {
      console.error("Failed to create activity", error);
    }
  };

  return (
    <KeyboardAvoiding>
      <Slider visible={open} setVisible={setOpen}>
        <Text preset="header" tx="createActivity.title" />
        <GForm initialValues={initialValues} validationSchema={validations} onSubmit={handleSubmit}>
          <GForm.NumberPicker max={10} tx="createActivity.maxParticipant" valName="nbParticipant" />
          <GForm.TextInput
            tx="createActivity.activityDescription"
            valName="descirption"
            placeholderTx="createActivity.descriptionPlaceholder"
            multiline
          />

          <GForm.DropPicker
            tx="createActivity.sportPicker"
            placeholderTx="createActivity.sportPicker"
            searchPlaceholder="Search a Sport"
            valName="sport"
            items={items}
            searchable
          />

          <GForm.AddressPicker valName="location" />
          <GForm.DateTimePicker
            tx="createActivity.when"
            valNames={{ start: "dateStart", end: "dateEnd" }}
            minimumDate={new Date()}
          />
          <GForm.Radio valName="type" items={activityTypeItems} />
          <GForm.NumberPicker max={10} tx="createActivity.maxParticipant" valName="nbParticipant" />
          <GForm.SubmitButton tx="createActivity.createActivity" style={{ alignSelf: "center" }} />
        </GForm>
      </Slider>
    </KeyboardAvoiding>
  );
}
