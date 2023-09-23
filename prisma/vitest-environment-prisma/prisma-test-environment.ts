import 'dotenv/config';

import { Environment } from 'vitest';

import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';

import { PrismaClient } from '@prisma/client';

const prismaCliente = new PrismaClient();

// pegar e mudar a URL de conexão
// postgresql://postgres:docker@localhost:5432/apisolid?schema=public
function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable');
  }

  const url = new URL(process.env.DATABASE_URL);

  // pegando o schema e mudando
  url.searchParams.set('schema', schema);

  return url.toString();
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    // criando schema do postgresql
    const schema = randomUUID();

    const databaseURL = generateDatabaseURL(schema);

    // SUBSTITUINDO A URL DE CONEXÃO
    process.env.DATABASE_URL = databaseURL;

    // EXECUTANDO AS MIGRATIONS
    /**
     * O migrate deploy, porque no momento que estar executando os testes
     * não queremos que o prisma faça o processo de comparar o arquivo de
     * schema local com o banco de dados que já existe, para ver se houve
     * alterações e assim criar novas migrations. Não queremos que seja
     * feito isso. Só vai abrir a pasta migrations e executar cada uma
     * que estiver lá.
     * Então o deploy pula esse processo de comparação
     */
    execSync('yarn prisma migrate deploy');

    return {
      async teardown() {
        // EXCLUIR OS BANCOS DE DADOS CRIADOS PARA OS TESTES
        /**
         * O executeRaw serve para executar operações de update, delete,
         * tipos de operações que não são buscas. Ele é protegido contra
         * SQL inject e contra operações maliciosas como apagar o banco de
         * dados.
         * Quando é uma busca (select) usaremos o queryRaw
         *
         * Por isso para deletar o banco de dados usaremos o
         * executeRawUnsafe
         */
        await prismaCliente.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        );

        await prismaCliente.$disconnect();
      },
    };
  },
};
