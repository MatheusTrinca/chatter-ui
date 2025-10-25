import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  // Include both .ts/.tsx and .graphql/.gql files for queries and fragments
  documents: ['src/**/*.ts'],
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
      config: {
        // Disable fragment masking for simpler usage (no useFragment() needed)
        fragmentMasking: false,
        // Use type-only imports for compatibility with verbatimModuleSyntax
        useTypeImports: true,
      },
    },
  },
};

export default config;
