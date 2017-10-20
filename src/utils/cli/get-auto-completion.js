import R from 'ramda';
import jetpack from 'fs-jetpack';
import path, { normalize } from 'path';
import { readJsonFile } from '@utils/files';
import { getDeepJsonChildren, deepJsonRegex } from '@utils/json';

export const getMatchingPath = (argvPath = '') => {
  const currentDirectory = jetpack.cwd();
  const targetPath = jetpack.exists(argvPath) ?
    argvPath :
    R.compose(
      R.join('/'),
      R.dropLast(1),
      R.split('/')
    )(argvPath);
  const targetFile = R.compose(R.last, R.split('/'))(argvPath);
  const targetPathFiles = [].concat(jetpack.list(path.resolve(currentDirectory, targetPath))).filter(Boolean);
  const fileMatchRegexp = RegExp(targetFile, 'gmi');

  return targetPath ? R.compose(
    R.filter((item) => item.match(fileMatchRegexp)),
    R.filter((item) => typeof item === 'string'),
    R.filter(Boolean)
  )(targetPathFiles) : [ ...targetPathFiles ];
};

export const getMatchingFile = (argvPath = '', argvBranch = '') => {
  const currentDirectory = jetpack.cwd();
  const targetFile = path.resolve(currentDirectory, argvPath);
  const targetBranch = argvBranch;

  const targetBranchPath = targetBranch.split(deepJsonRegex);
  const targetBranchAncestor = targetBranchPath.length <= 1 ?
    '' :
    `${R.compose(R.join('.'), R.dropLast(1))(targetBranchPath)}.`;
  const targetProperty = R.compose(R.last, R.split(deepJsonRegex))(targetBranch);
  const fileContents = readJsonFile(targetFile);

  const isMatchingPropertyName = (item) => item.indexOf(targetProperty) === 0;
  const mapItemNameToBranchPath = (item) => `${targetBranchAncestor}${item}`;

  if (fileContents) {
    return R.compose(
      R.map(mapItemNameToBranchPath),
      R.filter(isMatchingPropertyName)
    )(getDeepJsonChildren(fileContents, targetBranchAncestor));
  } else {
    process.stderr.write(`\n${targetFile} is not a valid JSON file.\n`);
  }

  return [];
};

export const getAutoCompletion = (current, argv = {}) => {
  if (argv && argv._) {
    const filePath = argv._[1];
    const filePathIsString = typeof filePath === 'string';
    const jsonBranch = argv._[2];
    const argumentsCount = argv._.length;
    const normalizedFilePath = filePathIsString ? normalize(filePath) : '';
    const targetsExistingFile = jetpack.exists(normalizedFilePath) === 'file';

    if (argumentsCount === 2 && !targetsExistingFile) {
      return getMatchingPath(normalizedFilePath);
    } else if (argumentsCount === 3 || targetsExistingFile) {
      return getMatchingFile(normalizedFilePath, jsonBranch);
    }
  }

  return [];
};
