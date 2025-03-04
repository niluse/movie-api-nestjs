import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { release } from 'os';

dotenv.config()

@Injectable()
export class MoviesService {
  private readonly URL = process.env.TMDB_API_URL ?? (() => { throw new Error('problem with tmdb url') })();
  private readonly API_KEY = process.env.TMDB_API_KEY ?? (()=>{throw new Error('problem with tmdb api key')})()

  async getMovies(limit:number,release_date?:string):Promise<CreateMovieDto[]>{
    if (release_date && release_date.match(/^\d{4}$/)) {
      release_date = `${release_date}-01-01`;
    }

    
    const {data} = await axios.get(`${this.URL}?api_key=${this.API_KEY}`,{
      params:{
        api_key:this.API_KEY,
        'vote_count.gte': 1500, // gte = greater than or equal
        'vote_average.gte': 8.4,
        ...(release_date && {'release_date.gte':release_date}),  //* ... ile optional parametre dinamik olarak eklenmis olur
        sort_by:'release_date.asc',
      }
    });


    console.log(release_date,'\n', typeof(release_date))
    console.log('api dan gelen:', typeof(data.results[0].release_date))
    return data.results.slice(0,limit)
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
