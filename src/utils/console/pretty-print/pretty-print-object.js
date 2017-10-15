import 'colors';
import R from 'ramda';
import { print } from './print';
import { getIndentation, indentStep } from './indent';
import { prettyPrint } from './index';

export const prettyPrintObject = (object = {}, indent = 0, colorOutput = false) => {
  const messageIndent = getIndentation(indent);

  print('{').thenAddNewLine();

  R.forEachObjIndexed((value, key) => {
    prettyPrint(key, value, indent + indentStep, colorOutput);
  })(object);

  print(`${messageIndent}}`).thenAddNewLine();
};
