import { jsonViewer } from '@src/json-viewer';
import { setUserConfig, getUserConfig } from '@src/config';
import { getCliParams } from '@utils/cli';
import { prettyPrint } from '@utils/console/pretty-print';

const cliParams = getCliParams();
const userConfig = setUserConfig(cliParams, getUserConfig());

const shouldExecuteFurther = cliParams.alwaysColor !== true;

if (shouldExecuteFurther) {
  const result = jsonViewer(cliParams, userConfig);
  const colorOutput = cliParams.color || userConfig.color;

  prettyPrint(null, result, 0, colorOutput);
}

module.exports = jsonViewer;

export default jsonViewer;
