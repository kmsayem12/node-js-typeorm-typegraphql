import { Entity, Column, ObjectIdColumn } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { Model } from "../model";

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

@Entity()
@ObjectType()
export class User extends Model {
  @ObjectIdColumn()
  @Field(() => String)
  _id: string;

  @Column()
  @Field(() => String)
  firstName: string;

  @Column()
  @Field(() => String)
  lastName: string;

  @Column()
  @Field(() => Int, { nullable: true })
  age?: number;

  //@Index("email_index")
  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({ default: true })
  @Field(() => Boolean)
  isActive?: boolean;

  @Column(() => Profile)
  @Field(() => Profile)
  profile: Profile;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
