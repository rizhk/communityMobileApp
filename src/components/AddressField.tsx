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
import { LocationType } from "types/global";

export type AddressFieldProps = {
  format: string;
  coord: LocationType;
  textProps?: TextProps;
  color?: ThemeColorType;
};

type FormatStringIndexesType = {
  [key : string ] : {type : string, name : "short_name" | "long_name"};
}
type AddrComponentType = google.maps.GeocoderAddressComponent[];
type  FormatStringIndexesKeyType = keyof typeof FormatStringIndexes;

const FormatStringIndexes : FormatStringIndexesType  = {
  streetNb: { type : "street_number", name : "short_name"},
  street: { type : "route", name : "short_name"},
  city: { type : "locality", name : "short_name"},
  state: { type : "administrative_area_level_1", name : "short_name"},
  stateLong: { type : "administrative_area_level_1", name : "long_name"},
  country: { type : "country", name : "short_name"},
  countryLong: { type : "country", name : "long_name"},
  NPA: { type : "postal_code", name : "short_name"},
};

const fetchAddrComponent = async (lt: number, lg: number) => {
  return await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lt},${lg}&key=${GOOGLE_API_KEY}`
  )
  .then((res) => res?.data?.results[0]?.address_components)
  .catch((erro) => {console.log(erro); return (undefined)});
}

const addrFormat = (addressComponent : AddrComponentType, format : string) : string => {
  var formatTmp = format;

  const matches = formatTmp.match(/%(\w+)%/g);
  if (matches) 
  { 
    matches.forEach(match => {
      const token = match.substring(1, match.length - 1);
      if (FormatStringIndexes.hasOwnProperty(token)) 
      {
        const key = FormatStringIndexes[token as FormatStringIndexesKeyType];
        const addrType = addressComponent.find((addr : any) => addr.types.includes(key.type));
        formatTmp = formatTmp.replace(match, addrType ? addrType[key.name] : "n/a")
      }
    })
  };
  return (formatTmp);
}

export default function AddressField(props: AddressFieldProps) {
  const [address, setAddress] = useState("");
  const { color = "primary", format, textProps = {}, coord } = props;

  useEffect(() => {
    fetchAddrComponent(coord.latitude, coord.longitude).then((res : AddrComponentType | undefined) => {
      if (res !== undefined)
        setAddress(addrFormat(res, format));
    })
  }, []);
  
  return (
    <XStack w="100%" gap="xs" ai="center">
      <Pin color={themeColor[color]} />
      <Text text={address} size="xs" {...textProps}/>
    </XStack>
  );
}
