import { Entity, ObjectIdColumn, BaseEntity, Column } from "typeorm";
import { ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
