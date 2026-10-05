# Pokémon Music API

API RESTful para catalogar músicas dos jogos de Pokémon. Permite cadastrar, consultar, atualizar e remover registros musicais com título, compositor, jogo de origem, geração, categoria e duração.

**Tecnologias:** Node.js, Express, TypeScript, Sequelize, PostgreSQL (Supabase) e Swagger.

## Entidade `PokemonMusic`

| Campo | Tipo | Descrição |
|---|---|---|
| id | INTEGER | Chave primária (auto incremento) |
| title | STRING | Título da música |
| composer | STRING | Compositor |
| game | STRING | Jogo de origem |
| generation | INTEGER | Geração (1 a 9) |
| category | STRING | `route`, `battle`, `town`, `gym` ou `other` |
| duration | INTEGER | Duração em segundos |
| createdAt / updatedAt | DATE | Gerados automaticamente |

## Pré-requisitos

- Node.js 18 ou superior
- Um projeto no [Supabase](https://supabase.com) (ou PostgreSQL local)

## Instalação e execução

1. Clone o repositório e instale as dependências:

   ```bash
   git clone <url-do-repositorio>
   cd pokemon-music-api
   npm install
   ```

2. Crie o arquivo `.env` a partir do exemplo e preencha com seus dados:

   ```bash
   cp .env.example .env
   ```

   | Variável | Descrição |
   |---|---|
   | PORT | Porta do servidor (padrão 3000) |
   | DB_HOST | Host do banco |
   | DB_PORT | Porta do banco (5432) |
   | DB_NAME | Nome do banco (`postgres` no Supabase) |
   | DB_USER | Usuário do banco |
   | DB_PASSWORD | Senha do banco |
   | DB_SSL | `true` para Supabase/nuvem, `false` para banco local |

   No Supabase, pegue os dados em **Connect > Session pooler**. O usuário tem o formato `postgres.<project-ref>`.

3. Inicie o servidor em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

   A tabela `pokemon_musics` é criada automaticamente na primeira execução.

4. Acesse a documentação interativa: http://localhost:3000/api-docs

### Build para produção

```bash
npm run build
npm start
```

## Endpoints

| Método | Rota | Descrição | Sucesso |
|---|---|---|---|
| GET | `/musicas` | Lista todas as músicas | 200 |
| GET | `/musicas/:id` | Busca uma música por ID | 200 |
| POST | `/musicas` | Cadastra uma música | 201 |
| PUT | `/musicas/:id` | Atualiza uma música | 200 |
| DELETE | `/musicas/:id` | Remove uma música | 200 |

Erros: `400` (entrada inválida), `404` (não encontrado) e `500` (erro interno).

### Exemplo de corpo (POST e PUT)

```json
{
  "title": "Pallet Town Theme",
  "composer": "Junichi Masuda",
  "game": "Pokémon Red/Blue",
  "generation": 1,
  "category": "town",
  "duration": 95
}
```

## Estrutura do projeto

```
src/
├── config/        # Banco de dados e Swagger
├── models/        # Modelo Sequelize + interface TypeScript
├── controllers/   # Lógica e validações
├── routes/        # Rotas (express.Router) com anotações Swagger
└── server.ts      # Ponto de entrada
```
