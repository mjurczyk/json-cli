import 'colors';
import { print } from './print';
import { getIndentation } from './indent';

export const prettyPrintString = (string = '', indent = 0, colorOutput = false) => {
  const messageIndent = getIndentation(indent);
  const color = colorOutput ? 'green' : 'white';

  print(`${messageIndent}${string}`[color]).thenAddNewLine();
};
