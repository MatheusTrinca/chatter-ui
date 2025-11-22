import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  // Include both .ts/.tsx and .graphql/.gql files for queries and fragments
  documents: 'src/**/*.ts',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        // Disable fragment masking for simpler usage (no useFragment() needed)
        fragmentMasking: false,
      },
    },
  },
};

export default config;
