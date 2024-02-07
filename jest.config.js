/** @type {import('ts-jest').JestConfigWithTsJest} */
const nextJest = require("next/jest");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

const createJestConfig = nextJest({
  dir: "./",
});

const esModules = [
  "nanoid",
  "lowdb",
  "reaflow",
  "easy-email-core",
  "uuid/dist/esm-browser",
  "d3-path/src",
  "d3-shape/src",
].join("|");

module.exports = createJestConfig({
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  testRegex: "test/.*\\.(js|jsx|ts)$",
  testPathIgnorePatterns: ["src/", "dist/", "public/"],
  moduleFileExtensions: ["js", "json", "ts"],
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["<rootDir>", "node_modules"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "@/app/*": ["<rootDir>/src/app/*"],
    "@jest/expect": ["<rootDir>/node_modules/@jest/expect/build/index.js"],
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  transform: {
    "^.+\\.ts?$": ["ts-jest", { isolatedModules: true, useESM: true }],
  },
  globals: {
    NODE_ENV: "test",
    "ts-jest": {
      useESM: true,
    },
  },
});

// transform: {
//     "^.+\\.(js)?$": require.resolve("babel-jest"),
//   },

// {
//     "^.+\\.js$": "babel-jest",
//     "^.+\\.ts$": "ts-jest",
//   },
