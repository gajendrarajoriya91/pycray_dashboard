
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
