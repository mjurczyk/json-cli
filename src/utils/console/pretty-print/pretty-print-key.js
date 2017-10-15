import 'colors';
import { print } from './print';
import { getIndentation } from './indent';

export const prettyPrintKey = (key = '', indent = 0, colorOutput = false) => {
  const keyIndent = getIndentation(indent);
  const color = colorOutput ? 'yellow' : 'white';

  print(`${keyIndent}"${key}": `[color]);
};
