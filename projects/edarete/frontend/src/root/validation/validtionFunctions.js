
// For Name
export function isAlphabeticWithSpaces(value) {
  return /^[A-Za-z\s]+$/.test(value) || value === '';
}

// For Integers
export function isPositiveIntegerOrEmpty(value) {
  return /^\d+$/.test(value) || value === '';
}

// No Negative Value
export function doesNotContainNegativeSign(value) {
  return !/^-/.test(value);
}
// Date Validation (yyyy-mm-dd)
export function FormatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}-${month}-${year}`;

}
export const getCurrentDateTime = () => {
  const now = new Date();
  const currentTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  return currentTime
}

export function formatDateTimeYMD(dateString) {
  console.log("dateString", dateString);
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export function extractTimeIn24HourFormat(isoDateString) {
  console.log("isoDateString:::",isoDateString)
  const date = new Date(isoDateString);
  const returnValue= date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
  });
  console.log("returnValue:::",returnValue)
  return returnValue
}


export function FormatDateYMD(dateString) {
  if (!dateString) return "";
  console.log("dateString", dateString);

  // Split the date string assuming the format is dd-mm-yyyy
  const [day, month, year] = dateString.split('-');

  // Create a Date object with the correct order of year, month, day
  const date = new Date(`${year}-${month}-${day}`);

  // Extract the year, month, and day
  const formattedYear = date.getFullYear();
  const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
  const formattedDay = String(date.getDate()).padStart(2, '0');

  // Return in yyyy-mm-dd format
  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}


// Password validation
export const isPasswordValid = (password) => {
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  return uppercaseRegex.test(password) && specialCharRegex.test(password);
};

// Email validation
export function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// Cnic validation
export function isValidCNIC(cnic) {
  const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
  return cnicRegex.test(cnic);
}

// Phone validation
export function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^0\d{10}$/;
  return phoneRegex.test(phoneNumber);
}

export function formateTime(startTime, hour12 = false) {
  const formattedStartTime = new Date(`2000-01-01T${startTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: hour12 });
  return formattedStartTime;
}
export function formateTime12Hour(startTime) {
  const formattedStartTime = new Date(`2000-01-01T${startTime}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  return formattedStartTime;
}
export function FutureDateTime(startDate,startTime){
  const StartDateTime = startDate + " " + startTime;
    console.log("Agaya::::::", StartDateTime);
    

    const startDateTimeObj = new Date(StartDateTime);
    

    const currentDateTime = new Date();
    
    if (startDateTimeObj > currentDateTime) {
        console.log("The StartDateTime is in the future.");
        return true
    } else {
        console.log("The StartDateTime is in the past or right now.");
        return false
    }
    
}
