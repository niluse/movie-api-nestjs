import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetMoviesDto{
    @IsNumber()
    @Type(()=>Number)   //* URL den gelen string i number a cevirir 
    limit:number

    @IsString()
    @IsOptional()
    release_date?:string
}