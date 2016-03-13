import console from 'console';

var log = (text, color, addTimestamp = DEFAULT_TIMESTAMP) => {
  let time = new Date(Date.now());
  let [ hours, minutes, seconds ] = [
    appendLeadingZero(time.getHours()),
    appendLeadingZero(time.getMinutes()),
    appendLeadingZero(time.getSeconds())
  ];
  let stdout = console.log;
  let timestamp = `[` + `${hours}:${minutes}:${seconds}`.gray + `]`;

  stdout((addTimestamp ? timestamp : '') + ` ${color ? text[color] : text}`);
};

var [ error, info, success ] = [
  (text) => log(text, THEME.error, ADD_TIMESTAMP),
  (text) => log(text, THEME.info, ADD_TIMESTAMP),
  (text) => log(text, THEME.success, SKIP_TIMESTAMP)
];
