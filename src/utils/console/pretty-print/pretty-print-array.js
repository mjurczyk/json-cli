import 'colors';
import R from 'ramda';
import { print } from './print';
import { getIndentation, indentStep } from './indent';
import { prettyPrint } from './index';

export const prettyPrintArray = (array = [], indent = 0, colorOutput = false, addComma = false) => {
  const messageIndent = getIndentation(indent);
  const arrayLength = R.length(array) - 1;

  print('[').thenAddNewLine();

  array.forEach((child, index) => {
    const isLast = index === arrayLength;

    prettyPrint(null, child, indent + indentStep, colorOutput, !isLast);
  });

  print(`${messageIndent}]`)
    .thenAddCommaIf(addComma)
    .thenAddNewLine();
};
