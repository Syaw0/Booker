const config = {
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.script.json" }],
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testEnvironment: "node",
  moduleNameMapper: {
    "scripts/(.*)": "<rootDir>/scripts/$1",
  },
};

export default config;
