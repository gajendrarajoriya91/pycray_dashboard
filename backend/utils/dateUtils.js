// utils/dateUtils.js

/**
 * Converts a UTC date string to IST.
 * @param {string} utcDateString - The UTC date string to convert.
 * @returns {string} - The date string in IST format.
 */
const convertUTCToIST = (utcDateString) => {
  const date = new Date(utcDateString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Kolkata",
  };
  const [month, day, year] = date
    .toLocaleDateString("en-IN", options)
    .split("/");

  return `${year}-${month}-${day}`;
};

module.exports = { convertUTCToIST };
