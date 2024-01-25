import Slider from "@react-native-community/slider";
import { fetchSports } from "api/sport-request";
import { Button } from "components/Button";
import { DatePicker, DropPicker } from "components/Inputs";

import { useContextMenu } from "components/Menu/Menu";
import { Text } from "components/Text";
import { XStack, YStack } from "components/containers/Stack/Stack";
import { DEFAULT_MAX_DISTANCE } from "constants/global";
import { useState } from "react";
import useSWR from "swr";
import { color } from "theme";
import { ActivityFilters } from "types/activity";
import { mapSportsDataToDropPickerItems } from "utils/helper";

//TODO: Add button create activity s'il y pas de données
//TODO: Pouvoir filter par adresse et rediriger dessus sur la map

interface ActivityFilterProps {
  onApply: (newFilters: ActivityFilters) => void;
  currentFilters: ActivityFilters;
}

function ActivityFilter(props: ActivityFilterProps) {
  const { onApply, currentFilters } = props;
  // const [maxDistance, setMaxDistance] = useState(currentFilters?.maxDistance || DEFAULT_MAX_DISTANCE);
  const [sport, setSport] = useState(currentFilters?.sport?.name || "");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { setOpen } = useContextMenu();

  const { data: dataSports, isLoading: isLoadingSport } = useSWR(["sports"], () => fetchSports());
  const items = dataSports ? mapSportsDataToDropPickerItems(dataSports) : [];

  return (
    <YStack bc="background" br="md" pa="xs">
      <YStack gap="md" pa="xs">
        <Text text="Sport Picker" />
        {/* <SportPickerComponent value={sport} setValue={setSport} /> */}
        <DropPicker items={items} value={sport} setValue={setSport} />

        {/* <Text text={"Distance: " + maxDistance + " km"} />
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={20}
          maximumValue={100}
          step={10}
          minimumTrackTintColor={color.primary}
          maximumTrackTintColor={color.primaryDark}
          thumbTintColor={color.primary}
          value={maxDistance}
          onValueChange={setMaxDistance}
        /> */}

        {/* //TODO: Add address Picker */}

        <Text text="Depuis le" />
        <DatePicker date={startDate} setDate={setStartDate} minimumDate={new Date()} />
        {/* <Text text="Au" />
            <DatePicker date={endDate} setDate={setEndDate} minDate={startDate} /> */}
      </YStack>

      <XStack jc="space-evenly" ai="center">
        <Button text="Cancel" size="sm" onPress={() => setOpen(false)} preset="plainText" style={{ flex: 1 }} />
        <Button
          text="Apply"
          size="sm"
          onPress={() => {
            onApply({ ...currentFilters, ...(sport && { sport: { name: sport } }) });
            setOpen(false);
          }}
          style={{ flex: 1 }}
        />
      </XStack>
    </YStack>
  );
}

export default ActivityFilter;
