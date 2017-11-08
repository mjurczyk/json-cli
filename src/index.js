import 'babel-polyfill';

import { jsonViewer } from '@src/json-viewer';
import { setUserConfig, getUserConfig } from '@utils/config';
import { getCliParams, getCliInput } from '@utils/cli';
import { prettyPrint } from '@utils/console/pretty-print';

const moduleWrapper = async () => {
  const cliInput = await getCliInput();
  const cliParams = getCliParams();
  const userConfig = setUserConfig(cliParams, getUserConfig());
  const shouldExecuteFurther = cliParams.alwaysColor !== true;

  if (shouldExecuteFurther) {
    const result = jsonViewer(cliInput, cliParams);
    const colorOutput = cliParams.color || userConfig.color;

    prettyPrint(null, result, 0, colorOutput);
  }
};

moduleWrapper();

module.exports = jsonViewer;

export default jsonViewer;
