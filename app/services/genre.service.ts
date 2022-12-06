import 'reflect-metadata';
import { Repository } from 'sequelize-typescript';
import { Service } from 'typedi';
import InjectRepository from '../decorators/inject-repository';
import { Genre } from '../models';

@Service()
export default class GenreService  {
  @InjectRepository(Genre)
  private genreRepository: Repository<Genre>;

  async index() {
    const genres = await this.genreRepository.findAll();

    return genres;
  }
}
