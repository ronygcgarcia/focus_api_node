import HttpCode from '../../configs/httpCode';
import { Request, Response } from 'express';
import 'reflect-metadata';
import { Inject, Service } from 'typedi';
import ProfileService from '../services/profile.service';

@Service()
class ProfileController {
  profileService: ProfileService;

  constructor(
  @Inject()
    profileService: ProfileService,
  ) {
    this.profileService = profileService;    
  }

  async index(req: Request, res: Response) {
    const routes = await this.profileService.getProfiles();
     
    return res.status(HttpCode.HTTP_OK).json(routes);
  }
}

export default ProfileController;


