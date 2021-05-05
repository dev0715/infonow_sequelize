import { Table, Column, Model } from 'sequelize-typescript'

@Table
export class Admin extends Model<Admin> {
    @Column
    name!: string
}