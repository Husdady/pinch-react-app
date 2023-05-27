// Utils
import { getMonths } from "../../OneTime/Months/utils"
import createList from "../../../../../../../utils/createList";
import generateUniqueId from "../../../../../../../utils/generateUniqueId";

// Constants
export const MAX_ITEMS = 35;
export const daysOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const maxItemsInCalendar = createList(MAX_ITEMS).map(() => null);

export const months = getMonths().map((month, i) => ({
  index: i,
  name: month.label,
  value: month.value,
  id: generateUniqueId(),
}));
