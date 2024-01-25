import { postAxiosApiFormData } from "api/api";
import { fetchSports } from "api/sport-request";
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
import { ActivityFormValues, ActivityItem } from "types/activity";
import { LocationType } from "types/global";
import { mapSportsDataToDropPickerItems } from "utils/helper";
import { fetchShortAddressFromCoords } from "utils/locationHelper";
import * as Yup from "yup";

// type ActivityFormType = {
//   description: string;
//   sport: [number];
//   type: "solo" | "private" | "public";
//   dateStart: Date;
//   dateEnd: Date;
//   maxParticipants: number;
//   location: LocationType;
//   [key: string]: any; // Add index signature
// };

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

const initialValues: ActivityFormValues = {
  description: "",
  sport: 3, //TODO: check if [number]
  type: "solo",
  dateStart: new Date(),
  dateEnd: nowMoreOneHour(),
  maxParticipants: INFINIT_PARTICIPANTS,
  latitude: 0,
  longitude: 0,
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

  const { data: dataSports, isLoading: isLoadingSport } = useSWR(["sports"], () => fetchSports());
  const items = dataSports ? mapSportsDataToDropPickerItems(dataSports) : [];

  const handleSubmit = async (values: ActivityFormValues) => {
    const address = await fetchShortAddressFromCoords({
      latitude: values.latitude,
      longitude: values.longitude,
    });

    try {
      const formattedValues: ActivityFormValues = {
        description: values.description,
        latitude: values.latitude,
        longitude: values.longitude,
        location: address,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,

        maxParticipants: values.maxParticipants,
        author: {
          id: 40, //TODO: replace by user id
        },
        sport: 1,

        // startHour: format(values.dateStart, "HH:mm:ss.SSS"),
        // endHour: format(values.dateEnd, "HH:mm:ss.SSS"),
        // date: values.dateStart, //TODO: Bug date jour avant, on avait déjà eu ça je crois
        type: values.type,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(formattedValues));

      try {
        await postAxiosApiFormData("/activities", formData);
        mutate("/activities");
      } catch (error) {
        console.error("Failed to create activity", error);
      }

      // mutate("/activities", (cachedData) => {
      //   // Supposant que cachedData est un tableau d'activités
      //   return [...cachedData, { ...values, id: response.data.id }]; // Ajoutez la nouvelle activité avec l'ID retourné
      // }, false);
    } catch (error) {
      console.error("Failed to create activity", error);
    }
  };

  isLoadingSport && <Text>Loading...</Text>; //TODO: add loading component

  return (
    <KeyboardAvoiding>
      <Slider visible={open} setVisible={setOpen}>
        <Text preset="header" tx="createActivity.title" />
        <GForm initialValues={initialValues} validationSchema={validations} onSubmit={handleSubmit}>
          <GForm.NumberPicker max={10} tx="createActivity.maxParticipant" valName="maxParticipants" />
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
          <GForm.NumberPicker max={10} tx="createActivity.maxParticipant" valName="maxParticipants" />
          <GForm.SubmitButton tx="createActivity.createActivity" style={{ alignSelf: "center" }} />
        </GForm>
      </Slider>
    </KeyboardAvoiding>
  );
}
