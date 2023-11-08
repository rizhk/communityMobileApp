import { Button } from "components/Button";
import MapComponent from "components/Map/Map";
import { View, StyleSheet, Text } from "react-native";

export default function MapScreen() {
  //useState

  //useEffect / FetchData / useQuery

  const initialRegion = {
    latitude: 37.783333,
    longitude: -122.416667,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View>
      {/* <MapComponent preset="small" style={styles.map} initialRegion={initialRegion} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "50%",
  },
});
