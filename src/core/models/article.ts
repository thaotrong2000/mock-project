import { Author } from './author';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: [];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}
