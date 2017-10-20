import { prettyPrintKey } from './pretty-print-key';
import { prettyPrintString } from './pretty-print-string';
import { prettyPrintArray } from './pretty-print-array';
import { prettyPrintObject } from './pretty-print-object';

export const prettyPrint = (key = null, value = '', indent = 0, colorOutput = false) => {
  const isString = typeof value === 'string';
  const isArray = value instanceof Array;
  const isObject = value !== null && typeof value === 'object';
  const isSymbol = typeof value === 'symbol';
  const hasKey = key !== null;

  if (hasKey) {
    prettyPrintKey(key, indent, colorOutput);
  }

  if (isString) {
    prettyPrintString(`"${value}"`, hasKey ? 0 : indent, colorOutput);
  } else if (isArray) {
    prettyPrintArray(value, indent, colorOutput);
  } else if (isObject) {
    prettyPrintObject(value, indent, colorOutput);
  } else if (isSymbol) {
    prettyPrintString(Symbol.toString(), indent, colorOutput);
  } else {
    prettyPrintString(value, hasKey ? 0 : indent, colorOutput);
  }
};
