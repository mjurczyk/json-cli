import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { warn } from '@utils/console';

chai.use(sinonChai);

describe('utils/console', () => {
  describe('warn', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();

      sandbox.stub(console, 'warn');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should print warning message to the console', () => {
      warn();

      // eslint-disable-next-line no-console
      expect(console.warn).to.have.been.called;
    });
  });
});
