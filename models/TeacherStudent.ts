import { DataTypes } from 'sequelize';
import { AllowNull, BelongsTo, Column, Default, ForeignKey, Index, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { SequelizeModel } from '../types/SequelizeModel';
import { Student } from './Student';
import { Teacher } from './Teacher';

@Table
export class TeacherStudent extends SequelizeModel<TeacherStudent>{

    @PrimaryKey
    @ForeignKey(() => Teacher)
    @Column(DataTypes.INTEGER.UNSIGNED)
    teacherId!: number

    @BelongsTo(() => Teacher)
    teacher!: Teacher

    @PrimaryKey
    @ForeignKey(() => Student)
    @Column(DataTypes.INTEGER.UNSIGNED)
    studentId!: number

    @BelongsTo(() => Student)
    student!: Student

    @AllowNull(false)
    @Default(DataTypes.NOW)
    @Column(DataTypes.DATE)
    createdAt!: Date


    @AllowNull(true)
    @Default(DataTypes.NOW)
    @Column(DataTypes.DATE)
    updatedAt!: Date

}