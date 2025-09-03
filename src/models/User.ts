import { AutoIncrement, Column, PrimaryKey, Table, AllowNull, Unique, Model, DataType } from "sequelize-typescript";

export type UserType = {
  email: string
  id: number
  name: string
}

@Table({
  tableName: 'users'
})

export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column
  declare name: string;

  @Unique
  @AllowNull(false)
  @Column
  declare email: string;

  @AllowNull(false)
  @Column
  declare password: string;
}


