import { IsNumber, IsString } from 'class-validator';

export class CreateRegisterDto {
  @IsString()
  pokemonUno: string;

  @IsString()
  pokemonDos: string;

  @IsString()
  pokemonWinner: string;

  @IsNumber()
  pokemonId: number;
}
