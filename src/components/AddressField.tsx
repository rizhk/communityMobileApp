// @ts-ignore
import { GOOGLE_API_KEY } from "@env";
import { ThemeColorType } from "theme";
import { TextProps } from "./Text/text.props";
import { XStack } from "./containers";
import { Pin } from "assets/svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text } from "./Text";
import { color as themeColor } from "theme";

export type AddressFieldProps = {
  format: string;
  coord: { lg: number; lt: number };
  textProps?: TextProps;
  color?: ThemeColorType;
};

const FormatStringIndexes = {
  streetNb: { i: 0, long : 0},
  street: { i: 1, long : 0},
  city: { i: 2, long : 0},
  state: { i: 4, long : 0},
  stateLong: { i: 4, long : 0},
  country: { i: 5, long : 0},
  countryLong: { i: 5, long : 0},
  NPA: { i: 6, long : 0},
};

const FormatStringKeys = Object.keys(FormatStringIndexes);

const getAddrData = async (lt: number, lg: number, format : string): Promise<string> => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lt},${lg}&key=${GOOGLE_API_KEY}`
    );
    const matches = format.match(/%(\w+)%/g);
      if (matches) 
      { 
        matches.forEach(match => {
          const token = match.substring(1, match.length - 1);
            if (FormatStringIndexes.hasOwnProperty(token)) 
            {
              const key = FormatStringIndexes[token];
              if (key.long)
                format = format.replace(match, response.data.results[0].address_components[key.i].long_name);
              else
              format = format.replace(match, response.data.results[0].address_components[key.i].short_name);
            }
        })
      };
  } catch (error : any) {
    throw (error);
  }
  return (format)
};

export default function AddressField(props: AddressFieldProps) {
  const [address, setAddress] = useState("");
  const { color = "primary", format, textProps = {}, coord } = props;

  useEffect(() => {
    const getGeoInv = async () => {
      if (coord.lt === 0 && coord.lg === 0) {
        setAddress("");
        return;
      }
      try {
        const addrData: string = await getAddrData(coord.lt, coord.lg, format);
        setAddress(addrData);
      } catch (error: any) {
        console.error("Error in useAddress:", error.message);
      }
    };

    getGeoInv();
  }, []);
  
  return (
    <XStack w="100%" gap="xs">
      <Pin color={themeColor[color]} />
      <Text text={address} size="xs" {...textProps} />
    </XStack>
  );
}
