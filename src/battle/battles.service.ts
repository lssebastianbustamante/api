import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { Battle } from './entity/battle.entity';
import { Repository } from 'typeorm';
import { CreateRegisterDto } from './dto/create-register.dto';

@Injectable()
export class BattlesService {
  constructor(
    @InjectRepository(Battle) private battleRepository: Repository<Battle>,
    private pokemosService: PokemonService,
  ) {}

  async createRegister(register: CreateRegisterDto) {
    const pokemonFound = await this.pokemosService.getPokemon(
      register.pokemonId,
    );
    if (!pokemonFound)
      return new HttpException('Pokeon not found', HttpStatus.NOT_FOUND);
    const newRegister = this.battleRepository.create(register);
    return this.battleRepository.save(newRegister);
  }

  getBattles() {
    return this.battleRepository.find();
  }
}
