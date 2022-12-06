import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import HttpCode from '../../configs/httpCode';
import GenreService from '../services/genre.service';

@Service()
export default class GenreController {
  genreService: GenreService;

  constructor(
  @Inject()
    genreService: GenreService,
  ) {
    this.genreService = genreService;    
  }

  async index(req: Request, res: Response) {
    const genres = await this.genreService.index();
    return res.status(HttpCode.HTTP_OK).json(genres);
  }
}
 