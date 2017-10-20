import R from 'ramda';

export const indentStep = 2;

export const getIndentation = (amount = 0) => R.join('')(R.repeat(' ', amount));
