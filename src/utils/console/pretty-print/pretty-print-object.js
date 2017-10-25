import 'colors';
import R from 'ramda';
import { print } from './print';
import { getIndentation, indentStep } from './indent';
import { prettyPrint } from './index';

export const prettyPrintObject = (object = {}, indent = 0, colorOutput = false, addComma = false) => {
  const messageIndent = getIndentation(indent);
  const objectKeysLength = R.compose(R.length, R.keys)(object) - 1;

  print('{').thenAddNewLine();

  R.addIndex(R.forEachObjIndexed)((value, key, object, index) => {
    const isLast = index === objectKeysLength;

    prettyPrint(key, value, indent + indentStep, colorOutput, !isLast);
  })(object);

  print(`${messageIndent}}`)
    .thenAddCommaIf(addComma)
    .thenAddNewLine();
};
