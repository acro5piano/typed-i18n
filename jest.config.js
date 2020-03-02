module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  timers: 'fake',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['.*build.*', '\\.snap$', 'node_modules'],
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
}
