import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Battle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonWinner: string;

  @Column()
  pokemonId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.battles)
  winner: Pokemon;
}
