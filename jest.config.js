module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/packages/**/*.{ts,tsx}', '<rootDir>/src/**/*.{ts}'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['<rootDir>/build', '\\.snap$', '<rootDir>/node_modules/'],
  cacheDirectory: '.jest/cache',
  timers: 'fake',
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
}
