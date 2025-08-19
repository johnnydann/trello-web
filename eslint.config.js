// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'

// export default [
//   { ignores: ['dist'] },
//   {
//     files: ['**/*.{js,jsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...reactHooks.configs.recommended.rules,
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],

//       //MUI
//       'no-restricted-imports': [
//         'error',
//         {
//           'patterns': [{ 'regex': '^@mui/[^/]+$' }]
//         }
//       ],
//     },
//   },
// ]


import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
    { ignores: ['dist'] },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
                ...globals.node // Thêm node globals như config cũ
            },
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module'
            }
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        rules: {
            // Base recommended rules
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,

            // React Refresh rules
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true }
            ],

            // React Hooks rules (từ config cũ)
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Console and code quality rules
            'no-console': 'warn',
            'no-lonely-if': 'warn',
            'no-unused-vars': [
                'warn',
                {
                    varsIgnorePattern: '^[A-Z_]',
                    argsIgnorePattern: '^_'
                }
            ],
            'no-trailing-spaces': 'warn',
            'no-multi-spaces': 'warn',
            'no-multiple-empty-lines': 'warn',
            'no-unexpected-multiline': 'warn',

            // Spacing and formatting rules
            'space-before-blocks': ['error', 'always'],
            'object-curly-spacing': ['warn', 'always'],
            'indent': ['warn', 4],
            'semi': ['warn', 'never'],
            'quotes': ['error', 'single'],
            'array-bracket-spacing': 'warn',
            'keyword-spacing': 'warn',
            'comma-dangle': 'warn',
            'comma-spacing': 'warn',
            'arrow-spacing': 'warn',

            // MUI import restriction
            'no-restricted-imports': [
                'error',
                {
                    'patterns': [{ 'regex': '^@mui/[^/]+$' }]
                }
            ]
        }
    }
]