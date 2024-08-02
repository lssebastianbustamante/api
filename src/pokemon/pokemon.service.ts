import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { Repository } from 'typeorm';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  async getPokemons() {
    return await this.pokemonRepository.find();
  }
  async getPokemon(id: number) {
    const pokemonFound = await this.pokemonRepository.findOne({
      where: {
        id,
      },
    });

    if (!pokemonFound)
      return new HttpException('Pokeon not found', HttpStatus.NOT_FOUND);

    return pokemonFound;
  }

  async populateDatabase() {
    const pokemonData = [
      {
        name: 'Pikachu',
        attack: 4,
        defense: 3,
        hp: 3,
        speed: 6,
        imageUrl:
          'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png',
      },
      {
        name: 'Charmander',
        attack: 4,
        defense: 3,
        hp: 3,
        speed: 4,
        imageUrl:
          'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png',
      },
      {
        name: 'Squirtle',
        attack: 3,
        defense: 4,
        hp: 3,
        speed: 3,
        imageUrl:
          'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png',
      },
      {
        name: 'Bulbasur',
        attack: 4,
        defense: 3,
        hp: 3,
        speed: 3,
        imageUrl:
          'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png',
      },
      {
        name: 'Eevee',
        attack: 4,
        defense: 3,
        hp: 4,
        speed: 5,
        imageUrl:
          'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png',
      },
    ];
    try {
      const pokemonToSave = pokemonData.map((pokemonData) => {
        const newPokemon = new Pokemon();
        newPokemon.name = pokemonData.name;
        newPokemon.attack = pokemonData.attack;
        newPokemon.defense = pokemonData.defense;
        newPokemon.hp = pokemonData.hp;
        newPokemon.speed = pokemonData.speed;
        newPokemon.imageUrl = pokemonData.imageUrl;
        return newPokemon;
      });
      await this.pokemonRepository.save(pokemonToSave);
    } catch (error) {
      console.error('Error al leer el archivo JSON:', error);
    }
  }

  async createPokemon(createPokemon: CreatePokemonDto) {
    const newPokemon = this.pokemonRepository.create(createPokemon);
    return this.pokemonRepository.save(newPokemon);
  }

  async battlePokemon(pokemonUno: number, pokemonDos: number) {
    const pokemon1: CreatePokemonDto = await this.pokemonRepository.findOne({
      where: { id: await pokemonUno },
    });

    const pokemon2: CreatePokemonDto = await this.pokemonRepository.findOne({
      where: {
        id: pokemonDos,
      },
    });
    if (!pokemon1 || !pokemon2)
      return new HttpException('User Not Found', HttpStatus.NOT_FOUND);

    let attacker = pokemon1;
    let defender = pokemon2;

    if (
      pokemon2.speed > pokemon1.speed ||
      (pokemon2.speed === pokemon1.speed && pokemon2.attack > pokemon1.attack)
    ) {
      attacker = pokemon2;
      defender = pokemon1;
    }

    while (attacker.hp > 0 && defender.hp > 0) {
      const damage = Math.max(1, attacker.attack - defender.defense);
      defender.hp -= damage;

      [attacker, defender] = [defender, attacker];

      return {
        id: attacker.id,
        name: attacker.name,
      };
    }
  }
}
