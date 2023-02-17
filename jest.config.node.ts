const config = {
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.script.json" }],
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testEnvironment: "node",
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    "db/(.*)": "<rootDir>/db/$1",
    "server/(.*)": "<rootDir>/server/$1",
    "scripts/(.*)": "<rootDir>/scripts/$1",
  },
};

export default config;
