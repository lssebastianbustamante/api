import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 70, nullable: false })
  name: string;

  @Column({ name: 'attack', type: 'int', nullable: false })
  attack: number;

  @Column({ name: 'defense', type: 'int', nullable: false })
  defense: number;

  @Column({ name: 'hp', type: 'int', nullable: false })
  hp: number;

  @Column({ name: 'speed', type: 'int', nullable: false })
  speed: number;

  @Column({ name: 'imageUrl', length: 70, nullable: false })
  imageUrl: string;
}
