module.exports = {
  // globalSetup: './jest.setup.js',
  testEnvironment: 'node',
  coverageThreshold: {
    // TODO: Raise confidence
    global: {
      branches: 10,
    },
  },
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx}',
  ],
  coverageReporters: ['lcov', 'json-summary', 'json', 'text'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src$1',
  },
};
