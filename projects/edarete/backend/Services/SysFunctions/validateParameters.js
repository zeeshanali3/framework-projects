const {executeQuery} = require("../Integrations/Database/queryExecution");
const { decryptData, decryptObject } = require("./Decryption");
const generatePayload = require('./generatePayload')

const argon2 = require('argon2');
const {projectDB} = require("../Integrations/Database/projectDb");


async function isValidPassword(req, res, plaintextPassword) {
  const email = req.body.email || req.query.email; // Extract email from request
  const query = "SELECT user_id, Password FROM users WHERE email = ?";
  const values = [email];
  const results = await executeQuery(query, values);

  if (results && results.length > 0) {
    const userId = results[0].user_id;
    const hashedPassword = results[0].Password;

    if (!hashedPassword) {
      return { error: "Invalid email or password" };
    }

    const match = await argon2.verify(hashedPassword, plaintextPassword);
    if (match) {
      return { value: userId };  // Return an object with the userId
    } else {
      return { error: "Invalid password" };
    }
  } else {
    return { error: "Invalid email or password" };
  }
}

async function isValidEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email); // Returns true or false
}

async function isValidEmail(req, res, email) {
  const decryptedEmail = await decryptData(email);
  const requestedPath = req.path.replace('/api/', '');
  const pathParts = requestedPath.split('/');
  const context = pathParts[1];
  if (await isValidEmailFormat(decryptedEmail)) {
    const query = "SELECT Email FROM users WHERE email = ?";
    const values = [decryptedEmail];
            const connection = await projectDB()
    const results = await executeQuery(query, values, connection);

    if (results && results.length > 0) {
      if (context === "signup") {
        return { error: "Email Already Exists" };
      }
      return { value: results[0].Token };
    } else {
      if (context === "login") {
        return { error: "Invalid email for login" };
      }
    }
  } else {
    return { error: "Invalid email format" };
  }
}

async function isValidName(req, res, namesObject) {
  namesObject = await decryptObject(namesObject); // Assuming you have a function to decrypt the namesObject
  const validationResults = {};
  const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/; // Define a regex for special characters excluding space

  for (const attributeName in namesObject) {
    if (namesObject.hasOwnProperty(attributeName)) {
      const name = namesObject[attributeName];

      // Check for empty string, presence of special characters, or length greater than 30 characters
      if (name.trim() === "" || specialCharacterRegex.test(name.replace(/\s/g, '')) || name.length > 30) {
        validationResults[attributeName] = "Invalid Name";
        return { error: `${attributeName} is Invalid` };
      } else if (typeof name === "string" && /\d/.test(name)) {
        validationResults[attributeName] = "Invalid Name";
        return { error: `${attributeName} is Invalid` };
      } else {
        validationResults[attributeName] = "Valid Name";
      }
    }
  }
  return validationResults;
}

async function isValidId(req, res, idObject) {
  const tableName = req.body.tableName || req.query.tableName; // Extract table name from request
  const validationResults = {};

  // Check if each id value in idObject exists in the specified table
  for (let attributeName in idObject) {
    if (idObject.hasOwnProperty(attributeName)) {
      let idValue = idObject[attributeName];
      if (attributeName == "TeacherEmployeeId" || attributeName == "TAssistEmployeeId") {
        attributeName = "EmployeeId";
      } else if (attributeName == "PreReqCourseId") {
        attributeName = "PlannedCourseId";
      }

      const Table = tableName[attributeName];
      const query = `SELECT * FROM ${Table} WHERE ${attributeName} = ?`;
      const values = [idValue];
      const results = await executeQuery(query, values);

      if (!results || results.length === 0) {
        validationResults[attributeName] = `Invalid ${attributeName}`;
        return { error: `${attributeName} is invalid` };
      }
    }
  }
  return validationResults;
}

async function isValidDate(req, res, dateString) {
  const allowFuture = req.body.allowFuture || req.query.allowFuture; // Extract allowFuture from request
  const allowPast = req.body.allowPast || req.query.allowPast; // Extract allowPast from request
  const optional = req.body.optional || req.query.optional; // Extract optional from request

  // Handle optional cases
  if (optional && (dateString === "" || dateString === null || dateString === undefined)) {
    return true; // No validation required for empty or undefined strings
  }

  // Decrypt the date string
  dateString = await decryptData(dateString);
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
  const inputDate = new Date(dateString);

  // Check if the date string matches the expected format
  if (!dateRegex.test(dateString)) {
    return { error: "Invalid date format. Use YYYY-MM-DD" };
  }

  // Check if the Date object is valid
  if (isNaN(inputDate.getTime())) {
    return { error: "Invalid date" };
  }

  // Check if future dates are allowed
  if (!allowFuture && inputDate > new Date()) {
    return { error: "Future dates are not allowed" };
  }

  // Check if past dates are allowed
  if (!allowPast && inputDate < new Date()) {
    return { error: "Past dates are not allowed" };
  }

  return true;
}

async function isPasswordComplex(req, res, password) {
  const uppercaseRegex = /[A-Z]/;
  const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  if (uppercaseRegex.test(password) && specialCharacterRegex.test(password)) {
    return true;
  } else {
    return { error: "Weak Password" };
  }
}
async function validateMarks(req, res, obtainedMarks) {
  const outOfMarks = req.body.outOfMarks || req.query.outOfMarks; // Extract outOfMarks from request
  obtainedMarks = await decryptData(obtainedMarks);
  const decryptedOutOfMarks = await decryptData(outOfMarks);
  obtainedMarks = parseFloat(obtainedMarks);
  const parsedOutOfMarks = parseFloat(decryptedOutOfMarks);

  if (obtainedMarks > parsedOutOfMarks) {
    return { error: "Obtained marks should not exceed total marks" };
  }
  return true;
}




async function isValidNumber(req, res, value) {
  const allowFloat = req.body.allowFloat || req.query.allowFloat; // Extract allowFloat from request
  const semester = req.body.semester || req.query.semester; // Extract semester from request
  const totalMarks = req.body.totalMarks || req.query.totalMarks; // Extract totalMarks from request

  value = await decryptData(value);
  const parsedTotalMarks = totalMarks ? parseFloat(totalMarks) : null;
  const num = allowFloat ? parseFloat(value) : parseInt(value);

  if (isNaN(num)) {
    return { error: "Invalid Number Format" };
  }
  if ((semester && (num <= 0 || num > 8)) || (parsedTotalMarks !== null && num > parsedTotalMarks)) {
    return semester ? { error: "Invalid Semester Value" } : { error: "Obtained marks should not exceed total marks" };
  }
  return true;
}

async function isValidWeightage(req, res, value) {
  value = await decryptData(value);
  const num = parseFloat(value);
  if (isNaN(num) || num < 0 || num > 100) {
    return { error: "Invalid Weightage Value" };
  }
  return true;
}

async function isValidSalary(req, res, value) {
  value = await decryptData(value);
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) {
    return { error: "Invalid Salary Value" };
  }
  return true;
}

async function isValidStatus(req, res, status) {
  status = await decryptData(status);
  const validStatuses = [
    "Active", "Inactive", "Unsubmitted", "In Progress", 
    "Approved", "Disapproved", "Not Verified", "Verified", 
    "Draft", "Template", "Scheduled"
  ];

  if (validStatuses.includes(status)) {
    return true;
  }
  return { error: "Invalid Status" };
}

async function isValidCNIC(req, res, cnic) {
  cnic = await decryptData(cnic);
  // Regular expression to match a valid CNIC number (e.g., 12345-6789123-4)
  const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;

  if (!cnicRegex.test(cnic)) {
    return { error: "Invalid CNIC" };
  }

  const query = `SELECT * FROM users WHERE CNIC = ?`;
  const values = [cnic];
  const results = await executeQuery(query, values);
  if (results.length > 0) {
    return { error: "Invalid CNIC" };
  }
  return true;
}

async function isValidPhoneNumber(req, res, phoneNumber) {
  phoneNumber = await decryptData(phoneNumber);
  const phoneRegex = /^0\d{2,3}-?\d{7,8}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return { error: "Invalid phone number" };
  }
  return true;
}

async function isValidYear(req, res, year) {
  year = await decryptData(year);
  const numericYear = parseInt(year);
  const currentYear = new Date().getFullYear();
  const minYear = 2000;

  if (Number.isNaN(numericYear)) {
    return { error: "Year is Invalid" };
  }

  if (numericYear < minYear || numericYear > currentYear) {
    return { error: "Invalid Year" };
  }
  return true;
}

async function isValidBloodGroup(req, res, bloodGroup) {
  bloodGroup = await decryptData(bloodGroup);
  const recognizedBloodGroups = [
    "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
  ];
  if (!recognizedBloodGroups.includes(bloodGroup.toUpperCase())) {
    return { error: "Invalid blood group" };
  }
  return true;
}

async function isValidText(req, res, text, allowSpecial = true, optional = false) {
  // Decrypt the text
  text = await decryptData(text);

  // Handle optional cases
  if (optional && (text === "" || text === null || text === undefined)) {
    return true; // No validation required for empty or undefined strings if optional is true
  }

  // Define a regex for special characters
  const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  // Validate text based on special characters allowance
  if (allowSpecial) {
    if (typeof text === "string" && text.trim() !== "") {
      return true;
    }
  } else {
    if (typeof text === "string" && text.trim() !== "" && !specialCharacterRegex.test(text)) {
      return true;
    }
  }

  return { error: "Invalid Text" };
}

async function isValidComponentType(req, res, componentType) {
  componentType = await decryptData(componentType);
  const tempType = componentType?.toLowerCase();
  if (tempType === "graded" || tempType === "not graded") {
    return true;
  }
  return { error: "Invalid Component Type" };
}

async function isValidCourseType(req, res, type) {
  type = await decryptData(type);
  const tempType = type?.toLowerCase();
  if (!["theory", "lab", "physical education", "internship"].includes(tempType)) {
    return { error: "Invalid Course Type" };
  }
  return true;
}

async function isValidCreditHours(req, res, cr) {
  cr = await decryptData(cr);
  const parsedValue = parseFloat(cr);

  if (isNaN(parsedValue) || !Number.isInteger(parsedValue) || parsedValue < 0 || parsedValue > 3) {
    return { error: "Invalid Credit Hours" };
  }

  return true;
}

async function isValidLectures(req, res, lec) {
  lec = await decryptData(lec);
  const numLec = Number(lec);

  if (numLec > 0 && numLec < 60) {
    return true;
  }
  return { error: "Invalid Lectures" };
}

async function isValidIBN(req, res, ibn) {
  ibn = await decryptData(ibn);
  // Regular expression to match only digits
  const digitRegex = /^[0-9]+$/;

  // Check if the IBN contains only digits
  if (!digitRegex.test(ibn)) {
    return { error: "Invalid book ISBN" }; // IBN contains non-digit characters
  }
  
  // Check if the length of IBN is between 10 and 13 digits
  const ibnLength = ibn.length;
  if (ibnLength >= 10 && ibnLength <= 13) {
    return true; // IBN is valid
  } else {
    return { error: "Invalid book ISBN" };
  }
}

async function isValidGender(req, res, gender) {
  gender = await decryptData(gender);
  const validGenders = ["Male", "Female", "Other"]; // Add other valid gender options if needed

  if (!validGenders.includes(gender)) {
    return { error: "Invalid gender" };
  }

  return true; // Valid gender
}
async function isValidAddress(req, res, address) {
  address = await decryptData(address);
  // Regular expression to match valid characters in the address (alphabets, numbers, and comma)
  const addressRegex = /^[a-zA-Z0-9, ]*$/;

  if (address.trim().length === 0 || !addressRegex.test(address)) {
    return { error: "Invalid address" };
  }

  return true; // Valid address 
}

async function isValidGrade(req, res, grade) {
  grade = await decryptData(grade);
  const validGrades = ['A+', 'A', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F', 'I', 'W'];
  if (validGrades.includes(grade)) {
    return true;
  } else {
    return { error: "Invalid Grade" };
  }
}

async function isValidTime(req, res, timeStr, optional = false) {
  // Handle optional cases
  if (optional && (timeStr === "" || timeStr === null || timeStr === undefined)) {
    return true; // No validation required for empty or undefined strings
  }
  timeStr = await decryptData(timeStr);

  const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

  // Validate time string
  if (timeRegex.test(timeStr)) {
    return true;
  }

  return { error: "Time is Invalid" };
}

async function isValidDay(req, res, day) {
  day = await decryptData(day);
  const lowercaseDay = day?.toLowerCase();
  const validDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return validDays.includes(lowercaseDay) ? true : { error: "Invalid Day" };
}

async function isValidBool(req, res, value) {
  value = await decryptData(value);
  return typeof value === 'boolean' ? true : { error: "Invalid Boolean Value" };
}

async function isValidIsPresent(req, res, value) {
  value = await decryptData(value);
  const isValid = value === 0 || value === 1;
  return isValid ? true : { error: "Invalid Present Status" };
}

async function isValidAttachments(req, res, files) {
  const fileCount = 10;
  if (files.length > fileCount) {
    return { error: `Maximum ${fileCount} Attachments Allowed` };
  }
  return true;
}

async function isValidRole(req, res, email, role) {
  const query = `
  SELECT
    r.RoleName, r.RoleId
  FROM
    roles r
  LEFT JOIN
    user_role_designation_department ur ON ur.RoleId = r.RoleId
  LEFT JOIN
    users u ON u.user_id = ur.user_id
  WHERE
    u.email = ? AND r.role_name = ?`;
  const values = [email, role];
  const results = await executeQuery(query, values);
  if (results && results.length > 0) {
    const userRole = results[0].RoleName;
    if (userRole?.toLowerCase() === role?.toLowerCase()) {
      return true;
    }
  }
  return { error: "You don't have permission to perform this action" };
}

async function isValidCloMappingLevel(req, res, level) {
  level = await decryptData(level);
  if (level >= 1 && level <= 6) {
    return true;
  }
  return { error: "Invalid Level" };
}



global.isValidEmailFormat = isValidEmailFormat;
global.isValidEmail = isValidEmail;
global.isValidRole = isValidRole;
global.isValidPassword = isValidPassword;
global.isValidName = isValidName;
global.isValidId = isValidId;
global.isValidNumber = isValidNumber;
global.isValidStatus = isValidStatus;
global.isValidCNIC = isValidCNIC;
global.isValidYear = isValidYear;
global.isValidPhoneNumber = isValidPhoneNumber;
global.isValidAddress = isValidAddress;
global.isValidGender = isValidGender;
global.isValidBloodGroup = isValidBloodGroup;
global.isValidDate = isValidDate;
global.isValidText = isValidText;
global.isValidGrade = isValidGrade;
global.isValidTime = isValidTime;
global.isValidDay = isValidDay;
global.isValidBool = isValidBool;
global.isPasswordComplex = isPasswordComplex;
global.isValidIBN = isValidIBN;
global.isValidComponentType = isValidComponentType;
global.isValidLectures = isValidLectures;
global.isValidCourseType = isValidCourseType;
global.isValidCreditHours = isValidCreditHours;
global.isValidSalary = isValidSalary;
global.validateMarks = validateMarks;
global.isValidIsPresent = isValidIsPresent;
global.isValidAttachments = isValidAttachments;
global.isValidCloMappingLevel = isValidCloMappingLevel;
global.isValidWeightage = isValidWeightage;