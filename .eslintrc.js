module.exports = {
  "parser": "babel-eslint",
  "env": {
    "es6": true,
    "jest": true
  },
  "extends": ["airbnb", "plugin:react-native/all"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "__DEV__": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["react", "react-native", "jsx-a11y", "import"],
  "rules": {
    "react/jsx-filename-extension": [
      "error",
      { "extensions": [".js", ".jsx"] }
    ],
    "import/prefer-default-export": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "react/jsx-one-expression-per-line": "off",
    "react-native/no-color-literals": "off",
    "react-native/sort-styles": "off",
    "global-require": "off",
    "react-native/no-raw-text": "off",
    "linebreak-style": 0,
    "react/prop-types": 0,
    "react/destructuring-assignment": 0,
    "react-native/no-inline-styles": 0,
  },
  "settings": {
    "import/resolver": {
      "babel-plugin-root-import": { "rootPathSuffix": "src" }
    }
  }
};
