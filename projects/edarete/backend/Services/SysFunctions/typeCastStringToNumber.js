function convertStringToNumber(obj) {
    // Create a new object to store the converted values
    const result = {};
  
    // Loop through the keys of the input object
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Convert the value to a number if it's a string
        result[key] = isNaN(obj[key]) ? obj[key] : parseFloat(obj[key]);
      }
    }
  
    return result;
  }
module.exports=convertStringToNumber