import { format as nfsFormat, differenceInCalendarDays } from "date-fns";

//TODO: needts to be translated with i18n
export function formatDateFromToday(date: Date, format? : string) {
  const diffDays = differenceInCalendarDays(new Date(), new Date(date));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (format)
  return (nfsFormat(new Date(date), format));
  return nfsFormat(new Date(date), "dd.MM.yy");
}
