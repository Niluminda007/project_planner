const moment = require("moment");

export const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const formatTime = (time) => {
  return moment(time).format("HH:mm"); // Format to display only the time
};
