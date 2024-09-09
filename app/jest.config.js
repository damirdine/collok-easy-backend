/**
 * @type {import('jest').Config}
 */
export default {
  testEnvironment: "node",
  // preset: "ts-jest",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/migrations/", // Ignore migrations directory
    "/seeders/", // Ignore seeders directory
  ],

  // extensionsToTreatAsEsm: [".js", ".mjs"],
  testMatch: ["**/tests/**/*.test.ts"], // Only run tests ending with '.test.js'
  globals: {
    "ts-jest": {
      diagnostics: false, // This disables type checking
    },
  },
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
};
