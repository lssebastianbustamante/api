import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsPositive()
  id: number;

  @IsNotEmpty({ message: 'Field name must be added' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Attack must be added' })
  @IsInt({ message: 'Attack must be of type number' })
  @IsPositive()
  attack: number;

  @IsNotEmpty({ message: 'Defense must be added' })
  @IsInt({ message: 'Defense must be of type number' })
  @IsPositive()
  defense: number;

  @IsNotEmpty({ message: 'Hp must be added' })
  @IsInt({ message: 'Hp must be of type number' })
  @IsPositive()
  hp: number;

  @IsNotEmpty({ message: 'Speed must be added' })
  @IsInt({ message: 'Speed must be of type number' })
  @IsPositive()
  speed: number;

  @IsNotEmpty({ message: 'Provide an image URL' })
  imageUrl: string;
}
