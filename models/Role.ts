import { DataTypes } from 'sequelize';
import { AllowNull, AutoIncrement, Column, Default, Index, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";


@Table
export class Role extends Model<Role>{


    @Index
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.TINYINT.UNSIGNED)
    roleId!: number

    @Index
    @AllowNull(false)
    @Unique(true)
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.STRING(36))
    roleUuid!: string

    @AllowNull(false)
    @Column(DataTypes.STRING(70))
    roleName!: string

    @AllowNull(false)
    @Default(DataTypes.NOW)
    @Column(DataTypes.DATE)
    createdAt!: Date


    @AllowNull(true)
    @Default(DataTypes.NOW)
    @Column(DataTypes.DATE)
    updatedAt!: Date
}