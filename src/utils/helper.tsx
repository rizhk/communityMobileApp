import { format as Format } from "date-fns";
import "i18n";
import i18n from "i18n-js";
import { fr, en, de, it } from "date-fns/locale";
import { LatLng } from "react-native-maps";

// import { buildUrl } from "cloudinary-build-url";

// export const cloudinaryUrl = (publicId, width, height, resizeType = "fill") =>
//   publicId
//     ? buildUrl(publicId, {
//         cloud: {
//           cloudName: "duhdurytr",
//         },
//         transformations: {
//           // color: "white",
//           // effect: {
//           //   name: "colorize",
//           // },
//           quality: "auto:best",
//           resize: {
//             type: resizeType,
//             width: width,
//             height: height,
//           },
//           gravity: resizeType != "pad" && "auto",
//           // format: "webp",
//         },
//       })
//     : null;

// export const cloudinaryUrl = (publicId, width, height, resizeType = "fill") =>
//   null;

export type GravityType =
  | "auto"
  | "center"
  | "face"
  | "face:center"
  | "north"
  | "north_east"
  | "east"
  | "south_east"
  | "south"
  | "south_west"
  | "west"
  | "north_west"
  | string;

export type ResizeType = "fit" | "fill" | "limit" | "pad" | "crop" | "scale" | string;

export const cloudinaryUrl = (
  publicId: string = "duhdurytr",
  width: number,
  height: number,
  resizeType: ResizeType = "fill",
  gravityType: GravityType
): string => {
  const gravity = gravityType ? `g_${gravityType},` : "";
  return `https://res.cloudinary.com/duhdurytr/image/upload/${gravity}c_${resizeType},h_${height},w_${width},q_auto:best,f_auto/${publicId}`;
};

// //TODO: improve cloudinaryUrl and replace by https://www.npmjs.com/package/@cloudinary/url-gen
// export const cloudinaryUrl = (
//   publicId = "duhdurytr",
//   width: number,
//   height: number,
//   resizeType = "fill",
//   gravityType = "auto"
// ) => {
//   return `https://res.cloudinary.com/duhdurytr/image/upload/g_${gravityType},c_${resizeType},h_${height},w_${width},q_auto:best,f_auto/${publicId}`;
// };

//Form
export const checkFormError = (errors: any, touched: any, name: string) => {
  return `${errors[name] && touched[name] ? "is-invalid form-icon-trailing" : ""} ${
    !errors[name] && touched[name] ? "is-valid" : ""
  }`;
};

export const formDataImage = async (values = {}, image: ImageUpload, field = "cover") => {
  let imageUri;
  if (typeof image === "string") {
    imageUri = image;
  } else if (image && image.uri) {
    imageUri = image.uri;
  } else {
    imageUri = null;
  }

  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  image &&
    formData.append(
      `files.${field}`,
      JSON.parse(
        JSON.stringify({
          uri: imageUri,
          type: "image/jpeg",
          name: field,
        })
      )
    );

  return formData;
};

export function convertToIdArray(data) {
  return data.map(({ id }) => id);
}

//Text
export function truncateWithEllipses(text: string, max: number) {
  return text.substr(0, max - 1) + (text.length > max ? "..." : "");
}

export function truncateWithReadmore(text: string, max: number) {
  return text.substr(0, max - 1) + (text.length > max ? "<a" : "");
}

//Divers
export function onlyUnique(value: any, index: number, self: any) {
  return self.indexOf(value) === index;
}

export function formatDate(date: Date): string {
  const newDate = new Date(date);
  let formattedDate: string;
  //TODO find a better way to translate the date ?
  const localeCode = i18n.locale.substring(0, 2);
  switch (localeCode) {
    case "en":
      formattedDate = Format(newDate, "dd MMMM yyyy", { locale: en });
      break;
    case "fr":
      formattedDate = Format(newDate, "dd MMMM yyyy", { locale: fr });
      break;
    case "de":
      formattedDate = Format(newDate, "dd MMMM yyyy", { locale: de });
      break;
    case "it":
      formattedDate = Format(newDate, "dd MMMM yyyy", { locale: it });
      break;
    default:
      formattedDate = Format(newDate, "dd MMMM yyyy", { locale: en });
      break;
  }
  return formattedDate;
}
// export function formatHour(date: Date, format: string): string;
// export function formatHour(date: string | number, format: string): string;
export function formatHour(date: any, format: string = "HH:mm:ss.SSS") {
  if (typeof date === "string") {
    const hour = `${new Date().toISOString()}`.split("T");
    const newDate = new Date(`${hour[0]}T${date}Z`);
    const formattedDate = Format(newDate, format);
    return formattedDate;
  } else if (typeof date === "number") {
    const newDate = new Date(date);
    const formattedDate = Format(newDate, format);
    return formattedDate;
  } else {
    const formattedDate = Format(date, format);
    return formattedDate;
  }
}

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

var rad = function (x: number) {
  return (x * Math.PI) / 180;
};
export function computeDistance(p1: LatLng, p2: LatLng): number {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.latitude - p1.latitude);
  var dLong = rad(p2.longitude - p1.longitude);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.latitude)) *
      Math.cos(rad(p2.latitude)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
}
