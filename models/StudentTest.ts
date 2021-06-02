import { DataTypes } from 'sequelize';
import { AllowNull, BelongsTo, Column, Default, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { SequelizeModel } from '../types/SequelizeModel';
import { Student } from './Student';
import { Test } from './Test';

@Table
export class StudentTest extends SequelizeModel<StudentTest>{

    @PrimaryKey
    @AllowNull(false)
    @Column(DataTypes.INTEGER.UNSIGNED)
    studentTestId!: number

    @ForeignKey(() => Student)
    @AllowNull(false)
    @Column(DataTypes.INTEGER.UNSIGNED)
    studentId!: number


    @ForeignKey(() => Test)
    @AllowNull(false)
    @Column(DataTypes.INTEGER.UNSIGNED)
    testId!: number


    @AllowNull(false)
    @Default(DataTypes.NOW)
    @Column(DataTypes.DATE)
    createdAt!: Date


    @AllowNull(true)
    @Default(DataTypes.NOW)
    @Column(DataTypes.DATE)
    updatedAt!: Date

    @BelongsTo(() => Student)
    user!: Student

    @BelongsTo(() => Test)
    test!: Test
}
