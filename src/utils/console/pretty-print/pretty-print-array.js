import 'colors';
import { print } from './print';
import { getIndentation, indentStep } from './indent';
import { prettyPrint } from './index';

export const prettyPrintArray = (array = [], indent = 0, colorOutput = false) => {
  const messageIndent = getIndentation(indent);

  print('[').thenAddNewLine();

  array.forEach((child) => {
    prettyPrint(null, child, indent + indentStep, colorOutput);
  });

  print(`${messageIndent}]`).thenAddNewLine();
};
