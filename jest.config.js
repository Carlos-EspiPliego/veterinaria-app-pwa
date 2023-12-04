// jest.config.js
const path = require('path');

module.exports = {
    "setupTestFrameworkScriptFile": "./__mocks__/mockFirebase",
  moduleNameMapper: {
    '^@components/(.*)$': path.resolve(__dirname, 'src/components/$1'),
    '^@containers/(.*)$': path.resolve(__dirname, 'src/containers/$1'),
    '^@pages/(.*)$': path.resolve(__dirname, 'src/pages/$1'),
    '^@styles/(.*)$': path.resolve(__dirname, 'src/styles/$1'),
    '^@assets/(.*)$': path.resolve(__dirname, 'src/assets/$1'),
    '^@hooks/(.*)$': path.resolve(__dirname, 'src/app/hooks/$1'),
    '^@features/(.*)$': path.resolve(__dirname, 'src/features/$1'),
    '^@navigation/(.*)$': path.resolve(__dirname, 'src/navigation/$1'),
  },
  automock: false,
  // ...other configurations
};
