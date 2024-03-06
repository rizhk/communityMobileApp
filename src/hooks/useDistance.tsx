import { LocationType } from "types/global";
//@ts-ignore
import { GOOGLE_API_KEY } from "@env";
import useCurrentPosition from "./useCurrentPosition";
import { useEffect, useState } from "react";
import axios from "axios";
import { i18n } from "i18n";

const fetchDistance = async (origin: string, destination: string): Promise<string> => {
  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${GOOGLE_API_KEY}&language=${i18n.currentLocale}`;

  return await axios
    .get(apiUrl)
    .then((response) => {
      const distanceText = response?.data?.rows[0]?.elements[0]?.distance.text;
      return distanceText;
    })
    .catch((erro) => {
      console.error(erro);
      return "Distance not found";
    });
};

export function useDistance(destination: LocationType, origin?: LocationType): string {
  const [distance, setDistance] = useState("");
  const originFormatted = origin
    ? `${origin.latitude.toString()},${origin.longitude.toString()}`
    : (() => {
        const currentPosition = useCurrentPosition();
        if (currentPosition[1])
          return `${currentPosition[0].latitude.toString()},${currentPosition[0].longitude.toString()}`;
      })();
  const destinationFormatted = `${destination.latitude.toString()},${destination.longitude.toString()}`;

  useEffect(() => {
    if (originFormatted)
      fetchDistance(originFormatted, destinationFormatted).then((res: string | undefined) => {
        if (res !== undefined) setDistance(res);
      });
  }, [originFormatted]);
  return distance;
}
