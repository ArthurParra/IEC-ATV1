import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

import { sequelize } from './config/database';
import { swaggerSpec } from './config/swagger';
import pokemonMusicRoutes from './routes/pokemonMusicRoutes';

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/musicas', pokemonMusicRoutes);

app.get('/', (_req, res) => {
  res.redirect('/api-docs');
});

async function start(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o PostgreSQL estabelecida.');

    // Cria a tabela caso ainda não exista
    await sequelize.sync();
    console.log('Tabela sincronizada.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Swagger em http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Falha ao iniciar a aplicação:', error);
    process.exit(1);
  }
}

start();
