import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export const MUSIC_CATEGORIES = ['route', 'battle', 'town', 'gym', 'other'] as const;
export type MusicCategory = (typeof MUSIC_CATEGORIES)[number];

// Interface TypeScript que representa a entidade
export interface PokemonMusicAttributes {
  id: number;
  title: string;
  composer: string;
  game: string;
  generation: number;
  category: MusicCategory;
  duration: number; // em segundos
  createdAt?: Date;
  updatedAt?: Date;
}

// Campos opcionais na criação (gerados automaticamente)
export type PokemonMusicCreationAttributes = Optional<
  PokemonMusicAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

export class PokemonMusic extends Model<PokemonMusicAttributes, PokemonMusicCreationAttributes> {
  declare id: number;
  declare title: string;
  declare composer: string;
  declare game: string;
  declare generation: number;
  declare category: MusicCategory;
  declare duration: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

PokemonMusic.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    composer: { type: DataTypes.STRING, allowNull: false },
    game: { type: DataTypes.STRING, allowNull: false },
    generation: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.STRING(30), allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: 'pokemon_musics',
    timestamps: true, // createdAt e updatedAt
  }
);
