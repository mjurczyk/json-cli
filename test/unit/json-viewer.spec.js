import path from 'path';
import { expect } from 'chai';
import { jsonViewer } from '@src/json-viewer';

describe('json-viewer', () => {
  it('should assume no params by default', () => {
    expect(jsonViewer()).to.be.null;
  });

  it('should return proper json property passed in params', () => {
    const mockConfigPath = path.resolve(`${__dirname}/../helpers/mock/config.file.mock.json`);
    const params = {
      _: [
        mockConfigPath,
        'color'
      ]
    };

    expect(jsonViewer('', params)).to.equal(true);
  });
});
