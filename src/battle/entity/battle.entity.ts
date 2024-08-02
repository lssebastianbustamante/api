import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Battle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonUno: string;

  @Column()
  pokemonDos: string;

  @Column()
  pokemonWinner: string;

  @Column()
  pokemonId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
}
