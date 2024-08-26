module.exports = {
  extends: [
    // ...
    "plugin:testing-library/react",
    "prettier",
  ],
  plugins: [
    // ...
    "testing-library",
  ],
  rules: {
    // ...
    "testing-library/await-async-query": "error",
    "testing-library/no-await-sync-query": "error",
    "testing-library/no-debugging-utils": "warn",
    "testing-library/no-dom-import": "off",
  },
};