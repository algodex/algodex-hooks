export default {
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
  coverageReporters: ['lcov', 'text', 'json-summary', 'text'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src$1',
  },
};
