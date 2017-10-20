import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { writeJsonFile } from '@utils/files';

chai.use(sinonChai);

describe('utils/files', () => {
  describe('writeJsonFile', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();

      sandbox.stub(console, 'warn');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return null for undefined or invalid file path', () => {
      expect(writeJsonFile()).to.be.null;
      expect(writeJsonFile(123)).to.be.null;
    });

    it('should warn the user then file cannot be written', () => {
      writeJsonFile('/', {});

      // eslint-disable-next-line no-console
      expect(console.warn).to.have.been.called;
    });
  });
});
