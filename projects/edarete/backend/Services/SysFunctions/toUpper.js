function ToUpper(obj) {
    const stack = [obj];
    while (stack.length > 0) {
      const currentObj = stack.pop();
      for (let prop in currentObj) {
        if (currentObj.hasOwnProperty(prop)) {
          const value = currentObj[prop];
          if (typeof value === 'string') {
            currentObj[prop] = value.toUpperCase();
          } else if (typeof value === 'object' && value !== null) {
            stack.push(value);
          }
        }
      }
    }
    return obj;
  }
  module.exports=ToUpper;