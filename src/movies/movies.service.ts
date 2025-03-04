import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config()

@Injectable()
export class MoviesService {
  private readonly URL = process.env.TMDB_API_URL ?? (() => { throw new Error('problem with tmdb url') })();
  private readonly API_KEY = process.env.TMDB_API_KEY ?? (()=>{throw new Error('problem with tmdb api key')})()

  async getMovies(limit:number):Promise<CreateMovieDto[]>{
    const {data} = await axios.get(`${this.URL}?api_key=${this.API_KEY}`);
    const newLimit= limit+1
    const filteredMovies = data.results
      .filter(
        (movie)=> movie.vote_count > 1500 && movie.vote_average > 7.0
      )
      .sort(
        (a, b) =>
          new Date(a.release_date).getTime() - new Date(b.release_date).getTime(),
      )
      .slice(0,(newLimit))
      
    return filteredMovies
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
