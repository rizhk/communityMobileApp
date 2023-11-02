import { format, differenceInCalendarDays } from "date-fns";

//TODO: needts to be translated with i18n
export function formatDateFromToday(date: Date, short: boolean = false) {
  const diffDays = differenceInCalendarDays(new Date(), new Date(date));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (!short) return format(new Date(date), "ccc, dd MMMM");
  return format(new Date(date), "dd.MM.yy");
}
