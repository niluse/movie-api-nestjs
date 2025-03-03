import { IsArray, IsBoolean, IsInt, IsOptional, IsPositive, IsString, IsUrl, Min, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

class GenreDto {
    @IsInt()
    id: number;
  
    @IsString()
    name: string;
  }

  
class ProductionCompanyDto {
    @IsInt()
    id: number;
  
    @IsOptional()
    @IsUrl()
    logo_path: string;
  
    @IsString()
    name: string;
  
    @IsString()
    origin_country: string;
  }
  
  class ProductionCountryDto {
    @IsString()
    iso_3166_1: string;
  
    @IsString()
    name: string;
  }
  
  class SpokenLanguageDto {
    @IsString()
    english_name: string;
  
    @IsString()
    iso_639_1: string;
  
    @IsString()
    name: string;
  }


export class CreateMovieDto {
    @IsBoolean()
    adult: boolean;

    @IsString()
    backdrop_path: string;
    
    @IsOptional()
    belongs_to_collection: any;

    @IsInt()
    @Min(0)
    budget: number;

    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>GenreDto)
    genres: GenreDto[];

    @IsOptional()
    homepage: any;
    
    @IsInt()
    @IsPositive()
    id: number;
    
    @IsOptional()
    imdb_id: any;
    
    @IsString()
    original_language: string;
    
    @IsString()
    original_title: string;
    
    @IsString()
    overview: string;
    
    @IsInt()
    popularity: number;
    
    @IsOptional()
    @IsString()
    poster_path: string;


    @IsOptional()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>ProductionCompanyDto)
    production_companies: ProductionCompanyDto[];


    @IsOptional()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>ProductionCountryDto)
    production_countries: ProductionCountryDto[];
    
    @IsString()
    release_date: string;
    
    @IsInt()
    @Min(0)
    revenue: number;
    
    @IsInt()
    @Min(0)
    runtime: number;



    @IsOptional()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>SpokenLanguageDto)
    spoken_languages:SpokenLanguageDto[];

    


    @IsString()
    status: string;
    
    //* Empty string kabul ediyor muuu??
    @IsString()
    tagline: string;
    

    @IsString()
    title: string;
    
    @IsBoolean()
    video: boolean;

    @IsInt()
    vote_average: number;
    
    @IsInt()
    vote_count: number;
}
