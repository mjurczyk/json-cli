import yargs from 'yargs';
import { getAutoCompletion } from '@utils/cli';

export const getCliParams = () => {
  const params = yargs
    .usage('$0 [options ...] [file] [branch]')
    .option('color', {
      alias: 'c',
      describe: 'Show colored output',
      type: 'boolean'
    })
    .option('always-color', {
      describe: 'Always show colored output',
      type: 'boolean'
    })
    .alias('--version', '-v')
    .completion('completion', 'Generate auto-completion script', getAutoCompletion)
    .help()
    .argv;

  return params;
};
