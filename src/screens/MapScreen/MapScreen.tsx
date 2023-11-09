import { fetchAPIqs } from "api/request";
import { Button } from "components/Button";
import MapComponent from "components/Map/Map";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useQuery } from "react-query";
import axios from "axios";

export default function MapScreen() {
  //useState

  //useEffect / FetchData / useQuery
  //FetchActivities
  async function fetchActivitiesQS() {
    try {
      const res = await fetchAPIqs(
        `/activities`,
        {
          populate: [
            "cover",
            "author",
            "author.avatar",
            "author.blockedUsers",
            "participants",
            "participants.avatar",
            "sport",
            "sport.icon",
            "sport.localizations",
            "channel",
            "blockedUsers",
          ],
        },
        {}
      );

      console.log("res", res);

      return res;
    } catch (err) {
      console.error(err, "Fetching activities qs error");
    }
  }

  const [activities, setActivities] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("activities");
        setActivities(res.data);
      } catch (err) {
        console.error(err, "Fetching activities error");
      }
    };

    fetchData();
  }, []);
  const { data, error, isLoading } = useQuery("activities", async () => {
    try {
      const res = await axios.get("activities");
      return res.data;
    } catch (err) {
      console.error(err, "Fetching activities error");
    }
  });
  console.log("data :", data); // fetchFields est une fonction pour récupérer les données

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
