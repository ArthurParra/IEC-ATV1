import { Router } from 'express';
import {
  getAllMusics,
  getMusicById,
  createMusic,
  updateMusic,
  deleteMusic,
} from '../controllers/pokemonMusicController';

const router = Router();

/**
 * @swagger
 * /musicas:
 *   get:
 *     summary: Lista todas as músicas
 *     description: Retorna todas as músicas cadastradas, ordenadas pelo id.
 *     tags: [Músicas]
 *     responses:
 *       200:
 *         description: Lista de músicas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PokemonMusic'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Erro interno do servidor.
 */
router.get('/', getAllMusics);

/**
 * @swagger
 * /musicas/{id}:
 *   get:
 *     summary: Busca uma música por ID
 *     description: Retorna os dados detalhados de uma música específica.
 *     tags: [Músicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da música
 *         example: 1
 *     responses:
 *       200:
 *         description: Música encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PokemonMusic'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: O id deve ser um número inteiro positivo.
 *       404:
 *         description: Música não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Música não encontrada.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Erro interno do servidor.
 */
router.get('/:id', getMusicById);

/**
 * @swagger
 * /musicas:
 *   post:
 *     summary: Cadastra uma nova música
 *     description: Cria um novo registro de música. Todos os campos são obrigatórios.
 *     tags: [Músicas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PokemonMusicInput'
 *     responses:
 *       201:
 *         description: Música criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PokemonMusic'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Campos obrigatórios ausentes: title, composer.'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Erro interno do servidor.
 */
router.post('/', createMusic);

/**
 * @swagger
 * /musicas/{id}:
 *   put:
 *     summary: Atualiza uma música
 *     description: Substitui os dados de uma música existente. Todos os campos são obrigatórios.
 *     tags: [Músicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da música
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PokemonMusicInput'
 *     responses:
 *       200:
 *         description: Música atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PokemonMusic'
 *       400:
 *         description: ID ou dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: generation deve ser um número inteiro entre 1 e 9.
 *       404:
 *         description: Música não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Música não encontrada.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Erro interno do servidor.
 */
router.put('/:id', updateMusic);

/**
 * @swagger
 * /musicas/{id}:
 *   delete:
 *     summary: Remove uma música
 *     description: Remove definitivamente uma música pelo ID.
 *     tags: [Músicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da música
 *         example: 1
 *     responses:
 *       200:
 *         description: Música removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Música removida com sucesso.
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: O id deve ser um número inteiro positivo.
 *       404:
 *         description: Música não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Música não encontrada.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Erro interno do servidor.
 */
router.delete('/:id', deleteMusic);

export default router;
