module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-puppeteer',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    setupFiles: ['./jest.setup.js'],
  };