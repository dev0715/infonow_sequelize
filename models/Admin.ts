import { Table, Column, Model } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { SequelizeModel } from '../types/SequelizeModel'

@Table
export class Admin extends SequelizeModel<Admin> {
    @Column(DataTypes.STRING)
    name!: string
}