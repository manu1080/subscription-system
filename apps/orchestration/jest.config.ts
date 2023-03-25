/* eslint-disable */
export default {
  displayName: 'orchestration',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/src/test/",
  ],
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/orchestration',
};
