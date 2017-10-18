import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { getDeepJsonBranch, getDeepJsonChildren, getJsonFromString } from '@utils/json';

chai.use(sinonChai);

describe('utils/json', () => {
  describe('getDeepJsonBranch', () => {
    let json = {
      testShallow: 1,
      testDeep: {
        testDeeper: [
          {
            testDeepInArray: 2
          }
        ]
      }
    };

    it('should return an empty object if given no arguments', () => {
      expect(getDeepJsonBranch()).to.deep.equal({});
    });

    it('should return whole json when not given any path', () => {
      expect(getDeepJsonBranch(json)).to.deep.equal(json);
    });

    it('should return shallow json property', () => {
      expect(getDeepJsonBranch(json, 'testShallow')).to.equal(1);
    });

    it('should return deep json property', () => {
      expect(getDeepJsonBranch(json, 'testDeep')).to.be.an('object');
      expect(getDeepJsonBranch(json, 'testDeep.testDeeper')).to.be.an('array');
    });

    it('should return deep json arrays', () => {
      expect(getDeepJsonBranch(json, 'testDeep.testDeeper[0]')).to.be.an('object');
      expect(getDeepJsonBranch(json, 'testDeep.testDeeper[0].testDeepInArray')).to.equal(2);
    });

    it('should support dot path patterns', () => {
      expect(getDeepJsonBranch(json, 'testDeep.testDeeper[0].testDeepInArray')).to.equal(2);
    });

    it('should support dot-index path patterns', () => {
      expect(getDeepJsonBranch(json, 'testDeep.testDeeper.0.testDeepInArray')).to.equal(2);
    });

    it('should support slash path patterns', () => {
      expect(getDeepJsonBranch(json, 'testDeep/testDeeper[0]/testDeepInArray')).to.equal(2);
      expect(getDeepJsonBranch(json, 'testDeep/testDeeper[0]testDeepInArray')).to.equal(2);
      expect(getDeepJsonBranch(json, 'testDeep/testDeeper/0/testDeepInArray')).to.equal(2);
    });
  });

  describe('getDeepJsonChildren', () => {
    let json = {
      testShallow: 1,
      testString: 'test',
      testDeep: {
        testDeeper: [
          {
            testDeepInArray: 2
          }
        ]
      }
    };

    it('should return an empty array of children if given no arguments', () => {
      expect(getDeepJsonChildren()).to.deep.equal([]);
    });

    it('should return root json keys when not given any path', () => {
      expect(getDeepJsonChildren(json)).to.deep.equal([ 'testShallow', 'testString', 'testDeep' ]);
    });

    it('should return json branch keys', () => {
      expect(getDeepJsonChildren(json, 'testDeep')).to.deep.equal([ 'testDeeper' ]);
    });

    it('should return an empty array when branch is not found', () => {
      expect(getDeepJsonChildren(json, 'testWrongBranch')).to.deep.equal([]);
    });

    it('should return an indices when target branch is an array', () => {
      expect(getDeepJsonChildren(json, 'testDeep.testDeeper')).to.deep.equal([ '0' ]);
    });

    it('should return an empty array when target branch is not enumerable', () => {
      expect(getDeepJsonChildren(json, 'testString')).to.deep.equal([]);
      expect(getDeepJsonChildren(json, 'testShallow')).to.deep.equal([]);
    });
  });

  describe('getJsonFromString', () => {
    let sandbox;
    let output;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      output = process.stderr;

      sandbox.stub(output, 'write');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('return null for invalid or no input', () => {
      expect(getJsonFromString()).to.equal(null);
      expect(getJsonFromString(123)).to.equal(null);
      expect(getJsonFromString(null)).to.equal(null);
      expect(getJsonFromString({})).to.equal(null);
    });

    it('return null for invalid or no input', () => {
      expect(getJsonFromString()).to.equal(null);
      expect(getJsonFromString(123)).to.equal(null);
      expect(getJsonFromString(null)).to.equal(null);
      expect(getJsonFromString({})).to.equal(null);
    });

    it('should warn about invalid input and failed parsing', () => {
      getJsonFromString('{');
      getJsonFromString(2);

      expect(output.write).to.have.been.calledTwice;
    });
  });
});
