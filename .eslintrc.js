module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        // Aquí puedes agregar o modificar reglas según tus necesidades
        "react/no-danger-with-children": "error",
        "react/no-danger": "error",
        "react/no-unescaped-entities": "error"
    },
};
