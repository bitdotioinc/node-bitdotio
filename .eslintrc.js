module.exports = {
  extends: ["prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["unused-imports", "prettier", "@typescript-eslint"],
  rules: {
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "none",
      },
    ],
    "prettier/prettier": ["warn"],
  },
};
