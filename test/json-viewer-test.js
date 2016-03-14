var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var cli = require('../lib/json-viewer.js');
var testFile = __dirname + '/json-file.json';

function testCli() {
  expect(cli).to.be.a('function');
};

function testTypes() {
  var string = cli([ '--silent', testFile, 'string-value' ]);
  var array = cli([  '--silent', testFile, 'array-value' ]);
  var object = cli([  '--silent', testFile, 'object-value' ]);
  var deepArray = cli([  '--silent', testFile, 'object-value.object' ]);

  expect(string).to.be.a('string');
  expect(array).to.be.an('array');
  expect(object).to.be.an('object');
  expect(deepArray).to.be.an('array');
};

testCli();
testTypes();

process.exit(0);