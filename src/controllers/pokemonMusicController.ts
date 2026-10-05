import { Request, Response } from 'express';
import { PokemonMusic, MUSIC_CATEGORIES, MusicCategory } from '../models/PokemonMusic';

interface MusicInput {
  title: string;
  composer: string;
  game: string;
  generation: number;
  category: MusicCategory;
  duration: number;
}

type ValidationResult = { data: MusicInput } | { error: string };

const isFilledString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

// Valida o req.params.id
function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// Valida o req.body (usado no POST e no PUT)
function validateBody(body: unknown): ValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Corpo da requisição inválido.' };
  }

  const { title, composer, game, generation, category, duration } = body as Record<string, unknown>;

  const required = { title, composer, game, generation, category, duration };
  const missing = Object.entries(required)
    .filter(([, value]) => value === undefined || value === null || value === '')
    .map(([key]) => key);

  if (missing.length > 0) {
    return { error: `Campos obrigatórios ausentes: ${missing.join(', ')}.` };
  }

  if (!isFilledString(title) || !isFilledString(composer) || !isFilledString(game)) {
    return { error: 'title, composer e game devem ser textos não vazios.' };
  }

  if (
    typeof generation !== 'number' ||
    !Number.isInteger(generation) ||
    generation < 1 ||
    generation > 9
  ) {
    return { error: 'generation deve ser um número inteiro entre 1 e 9.' };
  }

  if (typeof category !== 'string' || !MUSIC_CATEGORIES.includes(category as MusicCategory)) {
    return { error: `category deve ser um dos valores: ${MUSIC_CATEGORIES.join(', ')}.` };
  }

  if (typeof duration !== 'number' || !Number.isInteger(duration) || duration <= 0) {
    return { error: 'duration deve ser um número inteiro positivo (em segundos).' };
  }

  return {
    data: {
      title: title.trim(),
      composer: composer.trim(),
      game: game.trim(),
      generation,
      category: category as MusicCategory,
      duration,
    },
  };
}

export const getAllMusics = async (_req: Request, res: Response): Promise<void> => {
  try {
    const musics = await PokemonMusic.findAll({ order: [['id', 'ASC']] });
    res.status(200).json(musics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

export const getMusicById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      res.status(400).json({ error: 'O id deve ser um número inteiro positivo.' });
      return;
    }

    const music = await PokemonMusic.findByPk(id);
    if (!music) {
      res.status(404).json({ error: 'Música não encontrada.' });
      return;
    }

    res.status(200).json(music);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

export const createMusic = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = validateBody(req.body);
    if ('error' in result) {
      res.status(400).json({ error: result.error });
      return;
    }

    const music = await PokemonMusic.create(result.data);
    res.status(201).json(music);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

export const updateMusic = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      res.status(400).json({ error: 'O id deve ser um número inteiro positivo.' });
      return;
    }

    const result = validateBody(req.body);
    if ('error' in result) {
      res.status(400).json({ error: result.error });
      return;
    }

    const music = await PokemonMusic.findByPk(id);
    if (!music) {
      res.status(404).json({ error: 'Música não encontrada.' });
      return;
    }

    await music.update(result.data);
    res.status(200).json(music);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

export const deleteMusic = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      res.status(400).json({ error: 'O id deve ser um número inteiro positivo.' });
      return;
    }

    const music = await PokemonMusic.findByPk(id);
    if (!music) {
      res.status(404).json({ error: 'Música não encontrada.' });
      return;
    }

    await music.destroy();
    res.status(200).json({ message: 'Música removida com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
