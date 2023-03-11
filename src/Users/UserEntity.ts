import { Entity, ObjectIdColumn, BaseEntity, Column } from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => String)
  @ObjectIdColumn()
  id: string;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => Int, { nullable: true })
  @Column()
  age?: number;

  @Field(() => Boolean)
  @Column({ default: true })
  isActive?: boolean;
}

@InputType()
export class UserCreate implements Partial<User> {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  age: number;

  @Field({ nullable: true })
  isActive?: boolean;
}

@InputType()
export class UserUpdate implements Partial<User> {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  age: number;

  @Field({ nullable: true })
  isActive?: boolean;
}
