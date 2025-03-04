import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { GetMoviesDto } from './dto/get-movies.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@ApiTags('Movies') // Swagger'da 'Movies' başlığı altında gruplama yapar
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('get-movie-details')
  @ApiOperation({ summary: 'Filmleri filtreleyerek getirir' })
  @ApiQuery({ name: 'limit', required: true, type: Number, description: 'Getirilecek film sayısı' })
  @ApiQuery({ name: 'release_date', required: false, type: String, description: 'Belirli bir tarihten sonra yayınlanan filmler' })
  @ApiResponse({ status: 200, description: 'Başarıyla filtrelenen filmler', type: [CreateMovieDto] })
  async getMovieDetails(
    @Query(new ValidationPipe({ transform: true })) query: GetMoviesDto,
  ): Promise<CreateMovieDto[]> {
    const { limit, release_date } = query;
    return this.moviesService.getMovies(limit, release_date);
  }
}