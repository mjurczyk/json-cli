var showHelp = () => {
  let commands = {
    'json [flags] [file] [values]': 'Print JSON structure from a file',
    'json -c [file] [values]': 'Print colored JSON structure',
    'json -s [file] [values]': 'Silent run (for non-CLI usage)',
    'json --always-color': 'Set the color flag permanently',
    'json --completion': 'json --competion >> .bash_profile to enable autocompletion'
  };
  
  Object.keys(commands).forEach((key) => {
    let value = commands[key];
    
    log(`${key}\t${value}`);
  });
};