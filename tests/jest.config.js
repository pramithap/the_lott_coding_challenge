/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.jsx?$",
  testMatch: [
      "<rootDir>/src/**/*.test.js",
      "<rootDir>/tests/**/*.test.js"
  ]
};