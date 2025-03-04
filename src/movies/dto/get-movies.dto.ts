import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetMoviesDto{
    @ApiPropertyOptional({example:5})
    @IsNumber()
    @Type(()=>Number)   //* URL den gelen string i number a cevirir 
    limit:number

    @ApiPropertyOptional({example:'2020-01-01', description: 'Filter movies released after this year'})
    @IsString()
    @IsOptional()
    release_date?:string
}