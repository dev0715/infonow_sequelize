import { Table, Column, Model } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table
export class Admin extends Model<Admin> {
    @Column(DataTypes.STRING)
    name!: string
}