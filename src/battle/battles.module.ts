import { Module } from '@nestjs/common';
import { BattlesService } from './battles.service';
import { BattlesController } from './battles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Battle } from './entity/battle.entity';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  imports: [TypeOrmModule.forFeature([Battle]), PokemonModule],
  providers: [BattlesService],
  controllers: [BattlesController],
})
export class BattlesModule {}
