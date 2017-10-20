import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { prettyPrint } from '@utils/console/pretty-print';
import { print } from '@utils/console/pretty-print/print';
import { prettyPrintKey } from '@utils/console/pretty-print/pretty-print-key';
import { prettyPrintString } from '@utils/console/pretty-print/pretty-print-string';
import { prettyPrintArray } from '@utils/console/pretty-print/pretty-print-array';
import { prettyPrintObject } from '@utils/console/pretty-print/pretty-print-object';
import { getIndentation } from '@utils/console/pretty-print/indent';

chai.use(sinonChai);

describe('utils/console/pretty-print', () => {
  describe('prettyPrint', () => {
    let sandbox;
    let output;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      output = process.stdout;

      sandbox.stub(output, 'write');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should use null as a default key', () => {
      const value = 'test';

      prettyPrint(undefined, value, 0, false);
      prettyPrint(null, value, 0, false);

      expect(output.write).to.have.callCount(4);
      expect(output.write).to.have.been.calledWithMatch(value);
      expect(output.write).to.have.been.calledWithMatch(value);
    });

    it('should use empty string as a default value', () => {
      const value = '';

      prettyPrint(null, undefined, 0, false);
      prettyPrint(null, value, 0, false);

      expect(output.write).to.have.callCount(4);
      expect(output.write).to.have.been.calledWithMatch(value);
      expect(output.write).to.have.been.calledWithMatch(value);
    });

    it('should no add indent unless defined', () => {
      const value = 'test';

      prettyPrint(null, value, 0, false);
      prettyPrint(null, value, undefined, false);

      expect(output.write).to.have.callCount(4);
      expect(output.write).to.have.been.calledWithMatch(value);
      expect(output.write).to.have.been.calledWithMatch(value);
    });

    it('should not use color unless defined', () => {
      const value = 'test';

      prettyPrint(null, value, 0, false);
      prettyPrint(null, value, 0, undefined);

      expect(output.write).to.have.callCount(4);
      expect(output.write).to.have.been.calledWithMatch(value);
      expect(output.write).to.have.been.calledWithMatch(value);
    });

    describe('pretty printing strings', () => {
      it('should print strings without any keys, color, or indent', () => {
        const key = null;
        const value = 'test';
        const indent = 0;
        const useColor = false;

        prettyPrint(key, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`${value}`);
      });

      it('should print strings with a key', () => {
        const key = 'key';
        const value = 'test';
        const indent = 0;
        const useColor = false;

        prettyPrint(key, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`${key}`);
        expect(output.write).to.have.been.calledWithMatch(`${value}`);
      });

      it('should print strings with color', () => {
        const key = 'key';
        const value = 'test';
        const indent = 0;
        const useColor = true;

        prettyPrint(key, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`${key}`);
        expect(output.write).to.have.been.calledWithMatch(`${value}`);
      });

      it('should print strings with indent', () => {
        const key = 'key';
        const value = 'test';
        const indent = 4;
        const useColor = false;

        prettyPrint(key, value, indent, useColor);
        prettyPrint(null, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`    "${key}"`);
        expect(output.write).to.have.been.calledWithMatch(`${value}`);
        expect(output.write).to.have.been.calledWithMatch(`    "${value}"`);
      });

      it('should print non-string values with a key', () => {
        const key = 'key';
        const value = 1;
        const indent = 0;
        const useColor = false;

        prettyPrint(key, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`${key}`);
        expect(output.write).to.have.been.calledWithMatch(`${value}`);
      });

      it('should treat numbers alike strings', () => {
        const key = null;
        const value = 100;
        const indent = 0;
        const useColor = false;

        prettyPrint(key, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`${value}`);
      });

      it('should treat null alike a string', () => {
        const key = null;
        const value = null;
        const indent = 0;
        const useColor = false;

        prettyPrint(key, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`${value}`);
      });

      it('should treat boolean alike a string', () => {
        const key = null;
        const value = true;
        const indent = 0;
        const useColor = false;

        prettyPrint(key, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`${value}`);
      });

      it('should treat function alike a string', () => {
        const key = null;
        const value = function () {};
        const indent = 0;
        const useColor = false;

        prettyPrint(key, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`${value}`);
      });
    });

    describe('pretty printing arrays', () => {
      it('should print arrays without any keys, color, or indent', () => {
        const key = null;
        const value = [ 'test-1', 'test-2' ];
        const indent = 0;
        const useColor = false;

        prettyPrint(key, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch('[');
        expect(output.write).to.have.been.calledWithMatch(`  "${value[0]}"`);
        expect(output.write).to.have.been.calledWithMatch(`  "${value[1]}"`);
        expect(output.write).to.have.been.calledWithMatch(']');
      });

      it('should print arrays with a key', () => {
        const key = 'key';
        const value = [ 'test-1', 'test-2' ];
        const indent = 0;
        const useColor = false;

        prettyPrint(key, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`${key}`);
        expect(output.write).to.have.been.calledWithMatch('[');
        expect(output.write).to.have.been.calledWithMatch(`  "${value[0]}"`);
        expect(output.write).to.have.been.calledWithMatch(`  "${value[1]}"`);
        expect(output.write).to.have.been.calledWithMatch(']');
      });

      it('should print arrays with color', () => {
        const key = 'key';
        const value = [ 'test-1', 'test-2' ];
        const indent = 0;
        const useColor = true;

        prettyPrint(key, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`${key}`);
        expect(output.write).to.have.been.calledWithMatch('[');
        expect(output.write).to.have.been.calledWithMatch(`  "${value[0]}"`);
        expect(output.write).to.have.been.calledWithMatch(`  "${value[1]}"`);
        expect(output.write).to.have.been.calledWithMatch(']');
      });

      it('should print arrays with indent', () => {
        const key = 'key';
        const value = [ 'test-1', 'test-2' ];
        const indent = 2;
        const useColor = false;

        prettyPrint(key, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`  "${key}"`);
        expect(output.write).to.have.been.calledWithMatch('[');
        expect(output.write).to.have.been.calledWithMatch(`    "${value[0]}"`);
        expect(output.write).to.have.been.calledWithMatch(`    "${value[1]}"`);
        expect(output.write).to.have.been.calledWithMatch('  ]');
      });
    });

    describe('pretty printing objects', () => {
      it('should print objects without any keys, color, or indent', () => {
        const key = null;
        const values = [ 'value', 'test' ];
        const object = {
          [ values[0] ]: values[1]
        };
        const indent = 0;
        const useColor = false;

        prettyPrint(key, object, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch('{');
        expect(output.write).to.have.been.calledWithMatch(`  "${values[0]}"`);
        expect(output.write).to.have.been.calledWithMatch(`"${values[1]}"`);
        expect(output.write).to.have.been.calledWithMatch('}');
      });

      it('should print objects with a key', () => {
        const key = 'key';
        const values = [ 'value', 'test' ];
        const object = {
          [ values[0] ]: values[1]
        };
        const indent = 0;
        const useColor = false;

        prettyPrint(key, object, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`${key}`);
        expect(output.write).to.have.been.calledWithMatch('{');
        expect(output.write).to.have.been.calledWithMatch(`  "${values[0]}"`);
        expect(output.write).to.have.been.calledWithMatch(`"${values[1]}"`);
        expect(output.write).to.have.been.calledWithMatch('}');
      });

      it('should print objects with color', () => {
        const key = 'key';
        const values = [ 'value', 'test' ];
        const object = {
          [ values[0] ]: values[1]
        };
        const indent = 0;
        const useColor = true;

        prettyPrint(key, object, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`${key}`);
        expect(output.write).to.have.been.calledWithMatch('{');
        expect(output.write).to.have.been.calledWithMatch(`  "${values[0]}"`);
        expect(output.write).to.have.been.calledWithMatch(`"${values[1]}"`);
        expect(output.write).to.have.been.calledWithMatch('}');
      });

      it('should print objects with indent', () => {
        const key = 'key';
        const values = [ 'value', 'test' ];
        const object = {
          [ values[0] ]: values[1]
        };
        const indent = 2;
        const useColor = false;

        prettyPrint(key, object, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`  "${key}"`);
        expect(output.write).to.have.been.calledWithMatch('{');
        expect(output.write).to.have.been.calledWithMatch(`    "${values[0]}"`);
        expect(output.write).to.have.been.calledWithMatch(`"${values[1]}"`);
        expect(output.write).to.have.been.calledWithMatch('  }');
      });
    });

    describe('pretty printing symbols', () => {
      it('should not attempt to print symbols', () => {
        const key = null;
        const value = Symbol('test');
        const indent = 0;
        const useColor = false;

        prettyPrint(key, value, indent, useColor);

        expect(output.write).to.have.been.calledWithMatch(`${Symbol.toString()}`);
      });
    });

    describe('pretty printing indentation', () => {
      it('should generate indentation from number', () => {
        const indent = getIndentation(2);
        const noIndent = getIndentation(0);
        const defaultIndent = getIndentation();

        expect(indent).to.equal('  ');
        expect(noIndent).to.equal('');
        expect(defaultIndent).to.equal(noIndent);
      });
    });
  });

  describe('prettyPrintKey', () => {
    let sandbox;
    let output;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      output = process.stdout;

      sandbox.stub(output, 'write');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should use empty string as a default value', () => {
      const value = '';

      prettyPrintKey(undefined, 0, false);
      prettyPrintKey(value, 0, false);

      expect(output.write).to.have.callCount(2);
      expect(output.write).to.have.been.calledWithMatch(value);
      expect(output.write).to.have.been.calledWithMatch(value);
    });

    it('should use 0 as a default indent', () => {
      const value = '';

      prettyPrintKey(value, undefined, false);
      prettyPrintKey(value, 0, false);

      expect(output.write).to.have.callCount(2);
      expect(output.write).to.have.been.calledWithMatch(`${value}`);
      expect(output.write).to.have.not.been.calledWithMatch(`  ${value}`);
    });

    it('should not use color by default', () => {
      const value = '';

      prettyPrintKey(value, 0, undefined);
      prettyPrintKey(value, 0, false);

      expect(output.write).to.have.callCount(2);
      expect(output.write).to.have.been.calledWithMatch(`${value}`);
      expect(output.write).to.have.been.calledWithMatch(`${value}`);
    });
  });

  describe('prettyPrintString', () => {
    let sandbox;
    let output;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      output = process.stdout;

      sandbox.stub(output, 'write');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should use empty string as a default value', () => {
      const value = '';

      prettyPrintString(undefined, 0, false);
      prettyPrintString(value, 0, false);

      expect(output.write).to.have.callCount(4);
      expect(output.write).to.have.been.calledWithMatch(value);
      expect(output.write).to.have.been.calledWithMatch(value);
    });

    it('should use 0 as a default indent', () => {
      const value = '';

      prettyPrintString(value, undefined, false);
      prettyPrintString(value, 0, false);

      expect(output.write).to.have.callCount(4);
      expect(output.write).to.have.been.calledWithMatch(`${value}`);
      expect(output.write).to.have.not.been.calledWithMatch(`  ${value}`);
    });

    it('should not use color by default', () => {
      const value = '';

      prettyPrintString(value, 0, undefined);
      prettyPrintString(value, 0, false);

      expect(output.write).to.have.callCount(4);
      expect(output.write).to.have.been.calledWithMatch(`${value}`);
      expect(output.write).to.have.been.calledWithMatch(`${value}`);
    });
  });

  describe('prettyPrintArray', () => {
    let sandbox;
    let output;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      output = process.stdout;

      sandbox.stub(output, 'write');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should use [] as a default value', () => {
      const value = [];

      prettyPrintArray(undefined, 0, false);
      prettyPrintArray(value, 0, false);

      expect(output.write).to.have.callCount(8);
      expect(output.write).to.have.been.calledWithMatch('[');
      expect(output.write).to.have.been.calledWithMatch(']');
      expect(output.write).to.have.been.calledWithMatch('[');
      expect(output.write).to.have.been.calledWithMatch(']');
    });

    it('should use 0 as a default indent', () => {
      const value = [];

      prettyPrintArray(value, undefined, false);
      prettyPrintArray(value, 0, false);

      expect(output.write).to.have.callCount(8);
      expect(output.write).to.have.not.been.calledWithMatch('  [');
      expect(output.write).to.have.not.been.calledWithMatch('  ]');
      expect(output.write).to.have.not.been.calledWithMatch('  [');
      expect(output.write).to.have.not.been.calledWithMatch('  ]');
    });

    it('should not use color by default', () => {
      const value = [];

      prettyPrintArray(value, 0, undefined);

      expect(output.write).to.have.been.calledWithMatch('[');
      expect(output.write).to.have.been.calledWithMatch(']');
    });
  });

  describe('prettyPrintObject', () => {
    let sandbox;
    let output;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      output = process.stdout;

      sandbox.stub(output, 'write');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should use {} as a default value', () => {
      const value = {};

      prettyPrintObject(undefined, 0, false);
      prettyPrintObject(value, 0, false);

      expect(output.write).to.have.callCount(8);
      expect(output.write).to.have.been.calledWithMatch('{');
      expect(output.write).to.have.been.calledWithMatch('}');
      expect(output.write).to.have.been.calledWithMatch('{');
      expect(output.write).to.have.been.calledWithMatch('}');
    });

    it('should use 0 as a default indent', () => {
      const value = [];

      prettyPrintObject(value, undefined, false);
      prettyPrintObject(value, 0, false);

      expect(output.write).to.have.callCount(8);
      expect(output.write).to.have.not.been.calledWithMatch('  {');
      expect(output.write).to.have.not.been.calledWithMatch('  }');
      expect(output.write).to.have.not.been.calledWithMatch('  {');
      expect(output.write).to.have.not.been.calledWithMatch('  }');
    });

    it('should not use color by default', () => {
      const value = [];

      prettyPrintObject(value, 0, undefined);

      expect(output.write).to.have.been.calledWithMatch('{');
      expect(output.write).to.have.been.calledWithMatch('}');
    });
  });

  describe('print', () => {
    let sandbox;
    let output;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      output = process.stdout;

      sandbox.stub(output, 'write');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return a `thenAddNewLine` helper', () => {
      expect(print().thenAddNewLine).to.not.be.undefined;
    });

    it('should print empty string if no string given', () => {
      print();
      print('');

      expect(output.write).to.have.callCount(2);
      expect(output.write).to.have.been.calledWithMatch('');
      expect(output.write).to.have.been.calledWithMatch('');
    });
  });
});
