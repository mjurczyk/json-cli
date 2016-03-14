import colors from 'colors';
import console from 'console';
import fs from 'fs';
import path from 'path';

var appendLine = (container, lines, skipNewLine = DEFAULT_NEWLINE) => {
  container.push(
    ...([].concat(lines)),
    !skipNewLine ? NEWLINE : ''
  );
};

var colorArray = (array, indentDepth = INITIAL_INDENT) => {
  let output = [];
  let [ indentShallow, indentDeep ] = [ 
    getIndentString(indentDepth), 
    getIndentString(indentDepth + 1) 
  ];
  
  if (!isEmptyArray(array)) {
    appendLine(output, `\[`.white);
    array.forEach((value, index) => {
      appendLine(output, [
        `${indentDeep}${getContextualColor(value, indentDepth + 1)}`,
        isLastProperty(index, array) ? ','.white : ''
      ]);
    });
    appendLine(output, `${indentShallow}\]`.white, SKIP_NEWLINE);
  } else {
    appendLine(output, `\[ \]`.white, SKIP_NEWLINE);
  }
  
  return output.join('');
};

var colorString = (value) => `${(JSON.stringify(value) || 'undefined')}`[THEME.strings];

var colorObject = (object, indentDepth = INITIAL_INDENT) => {
  let output = [];
  let keys = Object.keys(object);
  let [ indentShallow, indentDeep ] = [ 
    getIndentString(indentDepth), 
    getIndentString(indentDepth + 1) 
  ];
  
  if (!isEmptyArray(keys)) {
    appendLine(output, `\{`.white);
    keys.forEach((key, index) => {
      appendLine(output, [
        `${indentDeep}\"${key}\"`[THEME.keys],
        `: `.gray,
        getContextualColor(object[key], indentDepth + 1),
        isLastProperty(index, keys) ? ','.white : ''
      ]);
    });
    appendLine(output, `${indentShallow}\}`.white, SKIP_NEWLINE);
  } else {
    appendLine(output, `\{ \}`.white, SKIP_NEWLINE);
  }
  
  return output.join('');
};

var getContextualColor = (value, depth = 0) => {
  if (isArray(value)) {
    return colorArray(value, depth);
  } else if (isObject(value)) {
    return colorObject(value, depth);
  } else {
    return colorString(value, depth);
  }
};

var trimFlags = (params) => {
  while ((params[0] || '').indexOf('-') === 0) {
    switch (params[0]) {
      case '-s':
      case '--silent':
        log = () => {};
      break;
      case '--noerr':
        error = () => {};
      break;
      case '-c':
      case '--color':
        THEME = THEME_COLOR;
      break;
      case '-h':
      case '--help':
        showHelp();
        breakFlag = true;
      break;
      case '--always-color':
        try {
          fs.writeFileSync(CONFIG_FILE, JSON.stringify({
            'alwaysColor': true
          }), 'utf8');
        } catch (err) {
          error('FlagsError: ' + err);
          throw err;
        }
        breakFlag = true;
      break;
      case '--structure-tree':
        printStructureFlag = true;
      break;
    };
    
    params.splice(0, 1);
  }
};

var trimParams = (params) => {
  for (let i = 0; i < params.length; i++) {
    if (params[i].indexOf('.') !== -1) {
      params = [
        ...params.slice(0, i - 1),
        ...params[i].split('.'),
        ...params.slice(i + 1)
      ];
    }
  }
  return params;
};

var trimFilename = (params) => {
  let filename = params[0];
  
  if (path.extname(filename) !== '.json') {
    filename = `${filename}.json`;
  }
  params.splice(0, 1);
  
  return filename;
};

let jCat = (params) => {
  let file;
  let filename;
  let result;
  let config;
  let depthMap = [];
  let depthMapBase = Object().toString();
  
  try {
    config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    
    if (config.alwaysColor) {
      params.unshift('-c');
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      error(err);
      return;
    }
  }
  
  trimFlags(params);
  
  if (breakFlag) {
    return;
  }
  
  filename = trimFilename(params);
  params = trimParams(params);
  
  try {
    file = fs.readFileSync(filename, 'utf8');
    result = JSON.parse(file);
    
    while (isDefined(params[0])) {
      let nextParam = params[0];
      let iterationValue = result[nextParam];
      
      if (isDefined(iterationValue)) {
        result = iterationValue;
        depthMap.push(nextParam);
        params.splice(0, 1);
      } else {
        if (printStructureFlag) {
          var structurePath = [];
          
          structurePath = Object.keys(result)
          .filter((key) => {
            return key.indexOf(nextParam) === 0;
          });
          
          structurePath.forEach((key) => {
            let value = result[key];
            
            if (isObject(value) && !isEmptyObject(value)) {
              Object.keys(value).forEach((childKey) => {
                structurePath.push(`${depthMap.concat([ key, childKey ]).join('.')}`);
              });
            }
          });
          
          result = structurePath
          .map((key) => {
            let value = result[key];
            
            if (isObject(value) && !isEmptyObject(value)) {
              key += '.';
            }
            
            return `${depthMap.concat([ `${key}` ]).join('.')}`;
          })
          .join(' ');
          params = [];
        } else {
          depthMap.unshift(depthMapBase);
          error(`Error: ${depthMap.join('.')}.${nextParam} is not defined. Returning ${depthMap.join('.')}.`);
          params = [];
        }
      }
    }
  } catch (err) {
    error('RuntimeError: ' + err);
    return;
  }
  
  if (result !== undefined && !printStructureFlag) {
    log(`\r${getContextualColor(result)}`);
  } else if (printStructureFlag) {
    log(result);
  }
  
  return result;
};

if (isCLI()) {
  jCat(process.argv.slice(2));
}

module.exports = jCat;

export default jCat;
