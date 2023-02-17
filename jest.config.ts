const config = {
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
    "^.+\\.css$": "jest-transform-css",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    "db/(.*)": "<rootDir>/db/$1",
    "server/(.*)": "<rootDir>/server/$1",
    "scripts/(.*)": "<rootDir>/scripts/$1",
  },
};

export default config;
