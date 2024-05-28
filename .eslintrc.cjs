module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
	"airbnb",
	"airbnb-typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:react-hooks/recommended",
	"plugin:react/recommended",
	"plugin:react/jsx-runtime"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
	"no-tabs": "off",
	"no-nested-ternary": "off",
	"react/jsx-one-expression-per-line": "off",
	"jsx-a11y/label-has-associated-control": "off",
	"jsx-a11y/control-has-associated-label": "off",
	"@typescript-eslint/no-unsafe-member-access": "off",
	"@typescript-eslint/no-unsafe-call": "off",
	"@typescript-eslint/no-unsafe-argument": "off",
	"@typescript-eslint/no-unsafe-assignment": "off",
	'@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }]
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
