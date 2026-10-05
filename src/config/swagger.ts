import swaggerJsdoc from 'swagger-jsdoc';

const port = process.env.PORT ?? 3000;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokémon Music API',
      version: '1.0.0',
      description:
        'API RESTful para catalogar músicas dos jogos de Pokémon (título, compositor, jogo, geração, categoria e duração).',
    },
    servers: [{ url: `http://localhost:${port}` }],
    components: {
      schemas: {
        PokemonMusic: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Pallet Town Theme' },
            composer: { type: 'string', example: 'Junichi Masuda' },
            game: { type: 'string', example: 'Pokémon Red/Blue' },
            generation: { type: 'integer', minimum: 1, maximum: 9, example: 1 },
            category: {
              type: 'string',
              enum: ['route', 'battle', 'town', 'gym', 'other'],
              example: 'town',
            },
            duration: {
              type: 'integer',
              description: 'Duração em segundos',
              example: 95,
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        PokemonMusicInput: {
          type: 'object',
          required: ['title', 'composer', 'game', 'generation', 'category', 'duration'],
          properties: {
            title: { type: 'string', example: 'Pallet Town Theme' },
            composer: { type: 'string', example: 'Junichi Masuda' },
            game: { type: 'string', example: 'Pokémon Red/Blue' },
            generation: { type: 'integer', minimum: 1, maximum: 9, example: 1 },
            category: {
              type: 'string',
              enum: ['route', 'battle', 'town', 'gym', 'other'],
              example: 'town',
            },
            duration: {
              type: 'integer',
              description: 'Duração em segundos',
              example: 95,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Mensagem de erro' },
          },
        },
      },
    },
  },
  // Caminhos relativos à raiz do projeto (funciona em dev e após o build)
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
