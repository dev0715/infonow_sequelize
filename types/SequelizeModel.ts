import { Model } from "sequelize-typescript";
import { FindOptions, Identifier, ModelAttributeColumnOptions, ModelStatic } from "sequelize/types";
import { SequelizeAttributes } from "./SequelizeAttributes";

export class SequelizeModel<T> extends Model<T>{



    static async findAllSafe<T>(attributeTypes: SequelizeAttributes = 'without-indexes', options?: FindOptions): Promise<T>{
        let columns = attributeTypes === 'with-indexes' ? this.getAttributes() : this.getNonIndexes();
        return this.findAll({ ...options, attributes: columns}) as any;
    }

    static async findOneSafe<T>(attributeTypes: SequelizeAttributes = 'without-indexes', options?: FindOptions): Promise<T>{
        let columns = attributeTypes === 'with-indexes' ? this.getAttributes() : this.getNonIndexes();
        return this.findOne({ ...options, attributes: columns}) as any;
    }

    static async findByPkSafe<T>(attributeTypes: SequelizeAttributes = 'without-indexes', identifier?: Identifier, options?: FindOptions): Promise<T>{
        let columns = attributeTypes === 'with-indexes' ? this.getAttributes() : this.getNonIndexes();
        return this.findByPk(identifier, { ...options, attributes: columns}) as any;
    }

    static getNonIndexes(): string[]{
        let keys = this.getAttributesCore(false)
        return keys;
    }

    static getIndexes(): string[] {
        let keys = this.getAttributesCore(true)
        return keys;
    }


    static getAttributes(): string[] {
        let keys = this.getAttributesCore()
        return keys;
    }


    private static isIndex(column: ModelAttributeColumnOptions) {
        return !!(column.primaryKey || column.references)
    }

    private static getAttributesCore(indexes?: boolean): string[] {
        let keys = [];
        for (let key in this.rawAttributes) {
            if (this.rawAttributes.hasOwnProperty(key)) {
                // Add All columns
                if (indexes === undefined) keys.push(key)
                
                // Add only Indexes or Non Indexes
                if (indexes === true && this.isIndex(this.rawAttributes[key])) { keys.push(key); }
                else if (indexes === false && !this.isIndex(this.rawAttributes[key])) { keys.push(key); }
            }
        }
        
        return keys;
    }
}