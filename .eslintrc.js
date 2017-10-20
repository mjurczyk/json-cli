module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 8,
    ecmaFeatures: {
      modules: true
    }
  },
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  parser: "babel-eslint",
  rules: {
    "no-extra-semi": 2,
    "no-console": 2,
    "no-constant-condition": 2,
    "no-debugger": 2,
    "no-irregular-whitespace": [ 2, {
      "skipStrings": true,
      "skipComments": true,
      "skipRegExps": true,
      "skipTemplates": true
    } ],
    "no-unexpected-multiline": 2,
    "curly": 2,
    "eqeqeq": 2,
    "no-multi-spaces": [2, {
      "exceptions": {
        "VariableDeclarator": true,
        "Property": true,
        "BinaryExpression": false,
        "ImportDeclaration": false
      }
    }],
    "no-sequences": 2,
    "brace-style": 2,
    "block-spacing": 2,
    "comma-dangle": [ 2, "never" ],
    "comma-spacing": 2,
    "eol-last": 2,
    "indent": [ 2, 2 ],
    "no-trailing-spaces": 2,
    "no-whitespace-before-property": 2,
    "quotes": [ 2, "single" ],
    "no-multiple-empty-lines": [ 2, {
      "max": 1
    } ],
    "linebreak-style": [ 2, "unix" ],
    "no-unused-vars": [ 2, {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": false
    }],
    "no-use-before-define": [ 2, {
      "functions": true,
      "classes": true
    }],
    "no-undef": 2,
    "strict": [ 2, "never" ],
    "semi": [ 2, "always" ],
    "arrow-parens": [ 2, "always" ],
    "arrow-body-style": [ 2, "as-needed" ],
    "object-curly-spacing": [ 2, "always" ]
  }
};
