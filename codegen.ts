import { appid } from './src/config'

import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    {
      'http://localhost:8100/graphql': {
        headers: {
          Appid: appid
        }
      }
    }
  ],
  config: {
    namingConvention: {
      typeNames: 'change-case-all#pascalCase',
      enumValues: 'change-case-all#upperCase'
    }
  },
  ignoreNoDocuments: true,
  pluckConfig: {
    globalGqlIdentifierName: ['gql', 'graphql']
  },
  overwrite: true,
  debug: true,
  generates: {
    'src/generated/graphql.ts': {
      documents: ['src/graphql/*.graphql'],
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        skipTypename: true, //<https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-operations#skiptypename>
        withHooks: true,
        federation: true
      },
      hooks: {
        afterOneFileWrite: ['prettier --write']
      }
    },
    'src/generated/graphql.schema.json': {
      documents: ['src/graphql/*.graphql'],
      plugins: ['introspection']
    }
  }
}
export default config
