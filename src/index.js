import { jsonViewer } from './json-viewer';
import { isCli } from './utils/is-cli';

if (isCli(module)) {
  console.info('is-cli');
  jsonViewer(process.argv);
}

console.info('is-module');

module.exports = jsonViewer;

export default jsonViewer;
