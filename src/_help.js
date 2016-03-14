var showHelp = () => {
  let commands = {
    'json [flags] [file] [values]': 'Print JSON structure from a file',
    'json -c [file] [values]': 'Print colored JSON structure',
    'json -s [file] [values]': 'Silent run (for non-CLI usage)',
    'json --set-color [true/false]': 'Set the color flag permanent value',
  };
  
  Object.keys(commands).forEach((key) => {
    let value = commands[key];
    
    log(`${key}\t${value}`);
  });
};