module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-puppeteer',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    setupFiles: ['./jest.setup.js'],
    
    globalSetup: "jest-environment-puppeteer/setup",
    globalTeardown: "jest-environment-puppeteer/teardown",
    
  };