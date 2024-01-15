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

const FormatStringIndexes = {
  city: { i: 0, term: "short_term" },
  street: { i: 0, term: "short_term" },
  streetNb: { i: 0, term: "short_term" },
  NPA: { i: 0, term: "short_term" },
  country: { i: 0, term: "short_term" },
  countryLong: { i: 0, term: "short_term" },
  state: { i: 0, term: "short_term" },
  stateLong: { i: 0, term: "short_term" },
};

const FormatStringKeys = Object.keys(FormatStringIndexes);

type addrObj = {
  st: string;
  stNbr: string;
  city: string;
  dist: string;
  ctL: string;
  ctS: string;
  landL: string;
  landS: string;
  pstc: string;
  [key: string]: string;
};

const getAddrData = async (lt: number, lg: number): Promise<addrObj> => {
  const addrObj: addrObj = {
    st: "",
    stNbr: "",
    city: "",
    dist: "",
    ctL: "",
    ctS: "",
    landL: "",
    landS: "",
    pstc: "",
  };
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lt},${lg}&key=${GOOGLE_API_KEY}`
    );
    if (response !== undefined) {
      addrObj.st = response?.data.results[0].address_components[1]?.short_name;
      addrObj.stNbr = response.data.results[0].address_components[0].short_name;
      addrObj.city = response?.data.results[0].address_components[2]?.short_name;
      addrObj.dist = response?.data.results[0].address_components[3]?.short_name;
      addrObj.ctL = response?.data.results[0].address_components[4]?.long_name;
      addrObj.ctS = response?.data.results[0].address_components[4]?.short_name;
      addrObj.landL = response?.data.results[0].address_components[5]?.long_name;
      addrObj.landS = response?.data.results[0].address_components[5]?.short_name;
      addrObj.pstc = response?.data.results[0].address_components[6]?.short_name;
      return addrObj;
    }
  } catch {
    throw "error : invers geocode in useAddress";
  }
  return addrObj;
};

const createAddr = (addrData: addrObj, format: string[], brk: string): string => {
  return format
    .map((v) => {
      if (addrData[v]) return addrData[v];
      else {
        console.error("Bad address format");
      }
    })
    .join(brk);
};

export type AddressFieldProps = {
  format: string[];
  coord: { lg: number; lt: number };
  textProps?: TextProps;
  color?: ThemeColorType;
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
        const addrData: addrObj = await getAddrData(coord.lt, coord.lg);
        setAddress(createAddr(addrData, format, " "));
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
