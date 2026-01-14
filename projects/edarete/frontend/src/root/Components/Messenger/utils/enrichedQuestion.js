// // utils.js
// import { format, parseISO, getDay } from "date-fns";
// import { formatDisplayDateChckIns } from "./formatTime";
// const dayMap = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// export function getEnrichedQuestion(
//   questionText,
//   pastMessages,
//   offDays = [],
//   weekendDays = []
// ) {
//   const TARGET_QUESTION = "What did you complete today?";
//   const SOURCE_QUESTION = "What are you planning to work on next working day?";

//   // If not the target question or invalid pastMessages, return original
//   if (questionText !== TARGET_QUESTION || !Array.isArray(pastMessages)) {
//     return questionText;
//   }

//   // Find most recent working day message (excluding offDays/weekendDays) that contains the SOURCE_QUESTION
//   const validMessage = [...pastMessages]
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .find((msg) => {
//       if (!msg || !msg.createdAt) return false;

//       let date;
//       try {
//         date = parseISO(msg.createdAt);
//         if (isNaN(date)) return false;
//       } catch {
//         return false;
//       }

//       const dayName = dayMap[getDay(date)];
//       const formattedDate = format(date, "yyyy-MM-dd");

//       const isOffDay = offDays.some((d) => d.date === formattedDate);
//       const isWeekend = weekendDays.some((d) => d.day === dayName);

//       return (
//         !isOffDay &&
//         !isWeekend &&
//         msg.entries?.some((entry) => entry.question === SOURCE_QUESTION)
//       );
//     });

//   // If no valid planned work found, return original question
//   const plannedEntry = validMessage?.entries?.find(
//     (entry) => entry.question === SOURCE_QUESTION
//   );
//   if (!plannedEntry?.answer) return questionText;

//   // Otherwise, enrich the question with previous plans
//   const formattedDate = formatDisplayDateChckIns(plannedEntry.answerTimestamp);
//   return `${questionText}\n\nYou previously planned to work on : 📅 ${formattedDate}:\n${plannedEntry.answer}`;
// }
// utils.js
// utils.js
// utils.js
// utils.js
// utils.js
/////////////////////////////////////////returnong the question
// import { format, parseISO, getDay, isBefore, isSameDay } from "date-fns";
// import { formatDisplayDateChckIns } from "./formatTime";

// const dayMap = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// export function getEnrichedQuestion(
//   questionText,
//   pastResponses,
//   offDays = [],
//   weekendDays = []
// ) {
//   console.warn(
//     "pastResponses",
//     pastResponses,
//     "question text",
//     questionText,
//     "off days",
//     offDays,
//     "weekend days",
//     weekendDays
//   );
//   const TARGET_QUESTION = "What did you complete today?";
//   const SOURCE_QUESTION = "What are you planning to work on next working day?";

//   // Early return if not the target question or invalid input
//   if (questionText !== TARGET_QUESTION || !Array.isArray(pastResponses)) {
//     return questionText;
//   }

//   // Get current date at midnight for accurate comparison
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   // Flatten all entries while preserving order (newest first)
//   const allEntries = pastResponses
//     .flatMap((response) => response.entries || [])
//     .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
//   console.log("allEntries", allEntries);
//   // Track the most recent planning message for each day
//   const latestEntriesByDay = new Map();

//   allEntries.forEach((entry) => {
//     // Basic validation
//     if (!entry || entry.userType !== "bot" || !entry.timeStamp) return;

//     try {
//       const entryDate = parseISO(entry.timeStamp);
//       if (isNaN(entryDate)) {
//         console.warn("Invalid date", entry.timeStamp);
//         return;
//       }

//       // Skip if entry is from today or future
//       if (!isBefore(entryDate, today)) {
//         console.warn("Entry is from today or future", entry.timeStamp);
//         return;
//       }

//       const dayKey = format(entryDate, "yyyy-MM-dd");

//       // Check if this was an off day or weekend
//       const dayName = dayMap[getDay(entryDate)];
//       const isOffDay = offDays.some((d) => d.date === dayKey);
//       const isWeekend = weekendDays.some((d) => d.day === dayName);
//       if (isOffDay || isWeekend) {
//         console.warn("Entry is an off day or weekend", entry.timeStamp);
//         return;
//       }

//       // Check if this is the planning question we're looking for
//       if (
//         // entry.messageType === "standup_question" &&
//         entry.content === SOURCE_QUESTION
//       ) {
//         // Only keep the first (newest) entry for each day
//         if (!latestEntriesByDay.has(dayKey)) {
//           latestEntriesByDay.set(dayKey, entry);
//         }
//       }
//     } catch {
//       console.warn("Error processing entry", entry.timeStamp);
//       return;
//     }
//   });
//   console.warn("latestEntriesByDay", latestEntriesByDay);

//   // Get the most recent planning entry from any day
//   const planningEntry = Array.from(latestEntriesByDay.values())[0];

//   // If no valid planning found, return original question
//   if (!planningEntry?.content) {
//     console.warn("No valid planning found", questionText);
//     return questionText;
//   }

//   // Format and enrich the question
//   const formattedDate = formatDisplayDateChckIns(planningEntry.timeStamp);
//   return `${questionText}\n\nYou previously planned to work on: 📅 ${formattedDate}:\n${planningEntry.content}`;
// }
import { format, parseISO, getDay, isBefore } from "date-fns";
import { formatDisplayDateChckIns } from "./formatTime";

const dayMap = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getEnrichedQuestion(
  questionText,
  pastResponses,
  offDays = [],
  weekendDays = []
) {
  console.warn("Function called with:", {
    questionText,
    pastResponses: pastResponses?.length,
    offDays,
    weekendDays,
  });

  const TARGET_QUESTION = "What did you complete today?";
  const SOURCE_QUESTION = "What are you planning to work on next working day?";

  // Early return if not the target question or invalid input
  if (questionText !== TARGET_QUESTION) {
    console.warn("Returning original question - not target question");
    return questionText;
  }

  if (!Array.isArray(pastResponses)) {
    console.warn("Returning original question - pastResponses not array");
    return questionText;
  }

  // Get current date at midnight for accurate comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Process all responses in chronological order (oldest first)
  const validPlanningAnswers = [];

  for (const response of pastResponses) {
    if (!response?.entries || !Array.isArray(response.entries)) {
      console.warn("Skipping response - missing entries array");
      continue;
    }

    let planningQuestionEntry = null;

    // Process entries in order to find question-answer pairs
    for (const entry of response.entries) {
      if (!entry || !entry.timeStamp) {
        console.warn("Skipping entry - missing or invalid");
        continue;
      }

      try {
        const entryDate = parseISO(entry.timeStamp);
        if (isNaN(entryDate)) {
          console.warn("Skipping entry - invalid date", entry.timeStamp);
          continue;
        }

        // Skip if entry is from today or future
        if (!isBefore(entryDate, today)) {
          console.warn(
            "Skipping entry - from today or future",
            entry.timeStamp
          );
          continue;
        }

        const dayKey = format(entryDate, "yyyy-MM-dd");
        const dayName = dayMap[getDay(entryDate)];

        // Check if this was an off day or weekend
        const isOffDay = offDays.some((d) => d.date === dayKey);
        const isWeekend = weekendDays.some((d) => d.day === dayName);
        if (isOffDay || isWeekend) {
          console.warn("Skipping entry - off day or weekend", dayKey, dayName);
          continue;
        }

        // If we find a planning question, store it temporarily
        if (entry.userType === "bot" && entry.content === SOURCE_QUESTION) {
          console.warn("Found planning question", entry);
          planningQuestionEntry = entry;
        }
        // If we find a user answer after a planning question, store the pair
        else if (planningQuestionEntry && entry.userType === "user") {
          console.warn("Found matching answer", entry);
          validPlanningAnswers.push({
            question: planningQuestionEntry,
            answer: entry,
            timestamp: entryDate,
          });
          planningQuestionEntry = null; // Reset for next potential pair
        }
      } catch (e) {
        console.warn("Error processing entry", entry, e);
        continue;
      }
    }
  }

  console.warn("All valid planning answers:", validPlanningAnswers);

  // Sort all valid answers by timestamp (newest first)
  validPlanningAnswers.sort((a, b) => b.timestamp - a.timestamp);

  // Get the most recent planning answer
  const mostRecentAnswer = validPlanningAnswers[0]?.answer;
  console.warn("Most recent answer:", mostRecentAnswer);

  // If no valid planning answer found, return original question
  if (!mostRecentAnswer?.content) {
    console.warn(
      "Returning original question - no valid planning answer found"
    );
    return questionText;
  }

  // Format and enrich the question
  const formattedDate = formatDisplayDateChckIns(mostRecentAnswer.timeStamp);
  const enrichedQuestion = `${questionText}\n\nYou previously planned to work on: 📅 ${formattedDate}:\n${mostRecentAnswer.content}`;

  console.warn("Returning enriched question:", enrichedQuestion);
  return enrichedQuestion;
}
