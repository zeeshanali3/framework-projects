import {
  parseISO,
  format,
  isToday,
  isYesterday,
  isValid,
} from "date-fns";
// For Day Label
export const formatDisplayDate = (isoDate) => {
  if (!isoDate) return "";
  const parsed = parseISO(isoDate);
  if (isNaN(parsed)) return isoDate;
  if (isToday(parsed)) return "Today";
  if (isYesterday(parsed)) return "Yesterday";
  return format(parsed, "MMMM d, yyyy");
};
//For chck ins
export const formatDisplayDateChckIns = (isoDate) => {
  if (!isoDate) return "";
  const parsed = parseISO(isoDate);
  if (isNaN(parsed)) return isoDate;
  // if (isToday(parsed)) return "Today";
  // if (isYesterday(parsed)) return "Yesterday";
  return format(parsed, "EEEE, MMMM d, yyyy");
};
//For message time stamp
export const formatDisplayDateTime = (isoDate) => {
  if (!isoDate) return "";
  const parsed = parseISO(isoDate);
  if (isNaN(parsed)) return isoDate;
  return format(parsed, "hh:mm a"); // e.g. 7:30 AM
};
//For message grouping by day

export const formatDisplayDateForGrouping = (timestamp, now = new Date()) => {
  if (!timestamp) return "Unknown";

  const date = parseISO(timestamp);
  if (!isValid(date)) return "Unknown"; // prevents wrong "Today"

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "dd MMM yyyy");
};

//  Group messages safely
export const groupMessagesByDay = (messages = [], now = new Date()) => {
  const groups = {};

  messages.forEach((msg) => {
    const dateKey = formatDisplayDateForGrouping(msg.timestamp, now);

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(msg);
  });

  console.warn("Grouped Messages:", groups);
  return groups;
};

// Add new message to existing groups safely
export const addMessageToGrouped = (prevGrouped, newMsg, now = new Date()) => {
  const dateKey = formatDisplayDateForGrouping(newMsg.timestamp, now);
  const updated = { ...prevGrouped };

  if (!updated[dateKey]) {
    updated[dateKey] = [];
  }
  updated[dateKey] = [...updated[dateKey], newMsg];

  return updated;
};
