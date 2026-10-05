# Pokémon Music API

API RESTful para catalogar músicas dos jogos de Pokémon. Permite cadastrar, consultar, atualizar e remover registros musicais com título, compositor, jogo de origem, geração, categoria e duração.

**Tecnologias:** Node.js, Express, TypeScript, Sequelize, PostgreSQL, Swagger, pnpm, Docker, GitHub Actions, ESLint, Prettier e Husky.

## Entidade `PokemonMusic`

| Campo                 | Tipo    | Descrição                                   |
| --------------------- | ------- | ------------------------------------------- |
| id                    | INTEGER | Chave primária (auto incremento)            |
| title                 | STRING  | Título da música                            |
| composer              | STRING  | Compositor                                  |
| game                  | STRING  | Jogo de origem                              |
| generation            | INTEGER | Geração (1 a 9)                             |
| category              | STRING  | `route`, `battle`, `town`, `gym` ou `other` |
| duration              | INTEGER | Duração em segundos                         |
| createdAt / updatedAt | DATE    | Gerados automaticamente                     |

## Endpoints

| Método | Rota           | Descrição               | Sucesso |
| ------ | -------------- | ----------------------- | ------- |
| GET    | `/musicas`     | Lista todas as músicas  | 200     |
| GET    | `/musicas/:id` | Busca uma música por ID | 200     |
| POST   | `/musicas`     | Cadastra uma música     | 201     |
| PUT    | `/musicas/:id` | Atualiza uma música     | 200     |
| DELETE | `/musicas/:id` | Remove uma música       | 200     |

Erros: `400` (entrada inválida), `404` (não encontrado) e `500` (erro interno).

Documentação interativa (Swagger): http://localhost:3000/api-docs

## Executando com Docker Compose (recomendado)

Pré-requisito: [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução.

```bash
docker compose up -d --build
```

Isso sobe dois contêineres: a **API** (porta 3000) e o **PostgreSQL** (com volume `pgdata` para persistência). A tabela é criada automaticamente na primeira execução.

```bash
docker compose ps        # verifica os contêineres ativos
docker compose logs api  # logs da API
docker compose down      # para os contêineres (os dados continuam no volume)
docker compose down -v   # para e apaga também o volume do banco
```

Para consultar o banco dentro do contêiner:

```bash
docker compose exec db psql -U postgres -d pokemon_music -c "SELECT * FROM pokemon_musics;"
```

As credenciais do banco em contêiner têm valores padrão no `docker-compose.yml`. Para alterá-las, defina `POSTGRES_DB`, `POSTGRES_USER` e `POSTGRES_PASSWORD` no `.env`.

## Executando localmente (sem Docker)

Pré-requisitos: Node.js 22+, [pnpm](https://pnpm.io) e um PostgreSQL (local ou Supabase).

```bash
pnpm install
cp .env.example .env   # preencha com os dados do banco
pnpm dev
```

| Variável    | Descrição                                            |
| ----------- | ---------------------------------------------------- |
| PORT        | Porta do servidor (padrão 3000)                      |
| DB_HOST     | Host do banco                                        |
| DB_PORT     | Porta do banco (5432)                                |
| DB_NAME     | Nome do banco                                        |
| DB_USER     | Usuário do banco                                     |
| DB_PASSWORD | Senha do banco                                       |
| DB_SSL      | `true` para Supabase/nuvem, `false` para banco local |

## Qualidade de código

| Script              | Função                                     |
| ------------------- | ------------------------------------------ |
| `pnpm lint`         | Análise estática com ESLint                |
| `pnpm lint:fix`     | Corrige automaticamente o que for possível |
| `pnpm format`       | Formata o código com Prettier              |
| `pnpm format:check` | Verifica a formatação sem alterar          |
| `pnpm typecheck`    | Checagem estrita de tipos (`tsc --noEmit`) |
| `pnpm build`        | Compila para `dist/`                       |

### Git hooks (Husky)

O hook de **pre-commit** (`.husky/pre-commit`) executa `lint`, `format:check` e `typecheck`. Se qualquer validação falhar, o commit é bloqueado.

### Integração contínua (GitHub Actions)

O workflow `.github/workflows/ci.yml` roda a cada `push`: checkout, configuração do Node.js e pnpm, instalação das dependências, lint, verificação de formatação, checagem de tipos e build.

## Estrutura do projeto

```
.
├── .github/workflows/ci.yml
├── .husky/pre-commit
├── src/
│   ├── config/        # Banco de dados e Swagger
│   ├── models/        # Modelo Sequelize + interface TypeScript
│   ├── controllers/   # Lógica e validações
│   ├── routes/        # Rotas com anotações Swagger
│   └── server.ts      # Ponto de entrada
├── Dockerfile
├── docker-compose.yml
├── eslint.config.mjs
└── .prettierrc
```
