import { Button } from "components/Button";
import MapComponent from "components/Map/Map";
import { View, StyleSheet, Text } from "react-native";

export default function MapScreen() {
  //useState

  //useEffect / FetchData / useQuery
  //FetchActivities

  const initialRegion = {
    latitude: 37.783333,
    longitude: -122.416667,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View>
      {/* <Button size="md" color="primary" preset="outlined" text="Hello" /> */}
      <MapComponent preset="small" style={styles.map} initialRegion={initialRegion} />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "50%",
  },
});
