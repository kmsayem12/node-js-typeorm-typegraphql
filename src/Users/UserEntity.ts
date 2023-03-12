import { Entity, ObjectIdColumn, BaseEntity, Column } from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";

@Entity()
@ObjectType()
export class Addresses {
  @Column()
  @Field(() => String)
  street: string;

  @Column()
  @Field(() => String)
  city: string;

  @Column()
  @Field(() => String)
  post: string;
}

@InputType()
export class AddressesCreate {
  @Field(() => String)
  street: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  post: string;
}

@Entity()
@ObjectType()
export class Profile {
  @Column()
  @Field(() => String)
  gender: string;

  @Column()
  @Field(() => String, { nullable: true })
  education?: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => [Addresses])
  address: [Addresses];
}
@InputType()
export class ProfileCreate {
  @Field(() => String, { nullable: true })
  gender: string;

  @Field(() => String, { nullable: true })
  education?: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => [AddressesCreate], { nullable: true })
  address: [AddressesCreate];
}

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @ObjectIdColumn()
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  firstName: string;

  @Column()
  @Field(() => String)
  lastName: string;

  @Column()
  @Field(() => Int, { nullable: true })
  age?: number;

  @Column({ default: true })
  @Field(() => Boolean)
  isActive?: boolean;

  @Column(() => Profile)
  @Field(() => Profile)
  profile: Profile;
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

  @Field(() => ProfileCreate, { nullable: true })
  profile: ProfileCreate;
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

  @Field(() => ProfileCreate, { nullable: true })
  profile: ProfileCreate;
}
