module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  collectCoverageFrom: ['**/src/**/*.{js,jsx}', '!**/src/**/.*'],
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  transform: {
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest'
  }
}
