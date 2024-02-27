/* eslint-disable prettier/prettier */
import { table } from "console";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@table
export class Grocery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  name: string;

  @Column({ type: "decimal" })
  price: number;

  @Column({ type: "int" })
  quantity: number;

}
