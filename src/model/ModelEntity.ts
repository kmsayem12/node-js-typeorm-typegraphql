import { Field } from "type-graphql";
import { CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

export default abstract class Model extends BaseEntity {
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
