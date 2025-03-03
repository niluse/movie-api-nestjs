import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config()

@Injectable()
export class MoviesService {

  async getMovies():Promise<CreateMovieDto[]>{
    const URL = process.env.TMDB_API_URL ?? (() => { throw new Error('problem with tmdb url') })();
    const API_KEY = process.env.TMDB_API_KEY ?? (()=>{throw new Error('problem with tmdb api key')})()
    const params = {
      api_key: API_KEY,
      // sort_by: 'release_date.asc',
      vote_count_gte: 1500,
      vote_average_gte: 8.4,
      with_watch_providers: 8,
      watch_region: 'TR',
      sort_by: 'vote_average.desc',  // Sıralamayı oy ortalamasına göre yap
    }

    const response = await axios.get(URL, { params });
    return response.data.results.slice(0, 5);
  }

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }


  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
