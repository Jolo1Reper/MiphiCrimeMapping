
// string processing
const capitalizeFirstLetter = (str) => {
    if (typeof str !== 'string' || str.length === 0) return null;
    return str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase();
  }

export default capitalizeFirstLetter;