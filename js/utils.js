const DATETIME_FORMAT_12HR_CLOCK = 'd MM yyyy, H:ii p';
const DATETIME_FORMAT_24HR_CLOCK = 'd MM yyyy, h:ii';

const HRS_PER_DAY = 24;
const MIN_PER_HR = 60;
const SEC_PER_MIN = 60;
const MS_PER_SEC = 1000;

const M_PER_KM = 1000;
const MI_PER_KM = 0.62137;

// User settings
var use12hrClock = true;
var useMiles = true;
var useFahrenheit = true;

// Pluralize noun based on quantity ("1 hour" / "2 hours")
function pluralize(count, noun) {
  return `${count} ${noun}${count > 1 ? 's' : ''}`;
}

// Get number of hours and remaining minutes from total minutes
function getHoursMinutes(totalMinutes) {
  let hrs = Math.floor(totalMinutes / MIN_PER_HR);
  let min = totalMinutes % MIN_PER_HR;
  return [hrs, min];
}

// Format total minutes as "x hours x minutes"
function formatDuration(totalMinutes) {
  let [hrs, min] = getHoursMinutes(totalMinutes);
  let time = '';
  if (hrs > 0) {
    time += pluralize(hrs, 'hour');
  }
  if (min > 0) {
    time += ' ' + pluralize(min, 'minute');
  }
  return time;
}

// Format total minutes as "x days x hours x minutes"
function formatTripDuration(totalMinutes) {
  let [hrs, min] = getHoursMinutes(totalMinutes);
  let days = Math.floor(hrs / HRS_PER_DAY);
  hrs = hrs % HRS_PER_DAY;
  let time = '';
  if (days > 0) {
    time += pluralize(days, 'day');
  }
  if (hrs > 0) {
    time += ' ' + pluralize(hrs, 'hour');
  }
  if (min > 0) {
    time += ' ' + pluralize(min, 'minute');
  }
  return time;
}

// Add minutes to a date/time
function addMinutes(startTime, minutes) {
  return new Date(startTime.getTime() + minutes * SEC_PER_MIN * MS_PER_SEC);
}

// Format display string for a date/time ("3 January 2024, 8:30 am")
function formatDateTime(dateTime) {
  return dateTime.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: use12hrClock
  }).replace(' at ', ', ');
}

// Format display string for arrival/departure time ("8:30 am Wed 3")
function formatTime(dateTime) {
  let time = dateTime.toLocaleString('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: use12hrClock
  });
  let date = dateTime.toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
  });
  return `${time} <small>${date}</small>`;
}

// Get distance in preferred units
function getDistance(meters, parentheses) {
  let distance = meters / M_PER_KM;
  if (useMiles) {
    distance *= MI_PER_KM;
  }
  distance = distance < 1 ? Math.round(distance * 10) / 10 : Math.round(distance);
  let str = distance + (useMiles ? ' mi' : ' km');
  if (parentheses) {
    str = '(' + str + ')';
  }
  return str;
}

// Get temperature in preferred units
function getTemperature(temperature) {
  if (useFahrenheit) {
    return Math.round(temperature * 9 / 5 + 32) + '°F';
  } else {
    return Math.round(temperature) + '°C';
  }
}
