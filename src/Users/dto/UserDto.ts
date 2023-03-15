import { Field, InputType } from "type-graphql";
import { User } from "../UserEntity";

@InputType()
export class AddressesCreate {
  @Field(() => String)
  street: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  post: string;
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
