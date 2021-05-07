import { Model } from "sequelize-typescript";
import { FindOptions, FindOrCreateOptions, Identifier, ModelAttributeColumnOptions, ModelStatic } from "sequelize/types";
import { SequelizeAttributes } from "./SequelizeAttributes";

export class SequelizeModel<T> extends Model<T>{

    /**
   * Search for multiple instances.
   ** __SequelizeAttributes.WithIndexes__ will return all attributes
   ** __SequelizeAttributes.WithoutIndexes__ will return all attributes except the primary keys and foreignkeys
   *
   * __Simple search using AND and =__
   * ```js
   * Model.findAllSafe(SequelizeAttributes.WithIndexes, {
   *   where: {
   *     attr1: 42,
   *     attr2: 'cake'
   *   }
   * })
   * ```
   * ```sql
   * WHERE attr1 = 42 AND attr2 = 'cake'
   * ```
   *
   * __Using greater than, less than etc.__
   * ```js
   *
   * Model.findAllSafe(SequelizeAttributes.WithIndexes, {
   *   where: {
   *     attr1: {
   *       gt: 50
   *     },
   *     attr2: {
   *       lte: 45
   *     },
   *     attr3: {
   *       in: [1,2,3]
   *     },
   *     attr4: {
   *       ne: 5
   *     }
   *   }
   * })
   * ```
   * ```sql
   * WHERE attr1 > 50 AND attr2 <= 45 AND attr3 IN (1,2,3) AND attr4 != 5
   * ```
   * Possible options are: `[Op.ne], [Op.in], [Op.not], [Op.notIn], [Op.gte], [Op.gt], [Op.lte], [Op.lt], [Op.like], [Op.ilike]/[Op.iLike], [Op.notLike],
   * [Op.notILike], '..'/[Op.between], '!..'/[Op.notBetween], '&&'/[Op.overlap], '@>'/[Op.contains], '<@'/[Op.contained]`
   *
   * __Queries using OR__
   * ```js
   * Model.findAllSafe(SequelizeAttributes.WithIndexes, {
   *   where: Sequelize.and(
   *     { name: 'a project' },
   *     Sequelize.or(
   *       { id: [1,2,3] },
   *       { id: { gt: 10 } }
   *     )
   *   )
   * })
   * ```
   * ```sql
   * WHERE name = 'a project' AND (id` IN (1,2,3) OR id > 10)
   * ```
   *
   * The success listener is called with an array of instances if the query succeeds.
   *
   * @see {Sequelize#query}
   */
    static async findAllSafe<T>(attributeTypes: SequelizeAttributes = SequelizeAttributes.WithIndexes, options?: FindOptions): Promise<T> {
        let columns = attributeTypes === SequelizeAttributes.WithIndexes ? this.getAttributes() : this.getNonIndexes();
        return this.findAll({ ...options, attributes: columns }) as any;
    }


    /**
   * Search for a single instance. Returns the first instance found, or null if none can be found.
   * * __SequelizeAttributes.WithIndexes__ will return all attributes
   * * __SequelizeAttributes.WithoutIndexes__ will return all attributes except the primary keys and foreignkeys
   */
    static async findOneSafe<T>(attributeTypes: SequelizeAttributes = SequelizeAttributes.WithIndexes, options?: FindOptions): Promise<T> {
        let columns = attributeTypes === SequelizeAttributes.WithIndexes ? this.getAttributes() : this.getNonIndexes();
        return this.findOne({ ...options, attributes: columns }) as any;
    }


    /**
   * Search for a single instance by its primary key. This applies LIMIT 1, so the listener will
   * always be called with a single instance.
   * * __SequelizeAttributes.WithIndexes__ will return all attributes
   * * __SequelizeAttributes.WithoutIndexes__ will return all attributes except the primary keys and foreignkeys
   */
    static async findByPkSafe<T>(attributeTypes: SequelizeAttributes = SequelizeAttributes.WithIndexes, identifier?: Identifier, options?: FindOptions): Promise<T> {
        let columns = attributeTypes === SequelizeAttributes.WithIndexes ? this.getAttributes() : this.getNonIndexes();
        return this.findByPk(identifier, { ...options, attributes: columns }) as any;
    }

    static async findOrCreateSafe<T>(attributeTypes: SequelizeAttributes = SequelizeAttributes.WithIndexes, options?: FindOrCreateOptions<T>): Promise<[T, boolean]> {
        let columns = attributeTypes === SequelizeAttributes.WithIndexes ? this.getAttributes() : this.getNonIndexes();
        return this.findOrCreate({ ...options, attributes: columns } as any) as any;
    }

    /**
     * Returns all columns of model except primary and foreign key indexes
     * 
     * e.g. _['username', 'email', 'password']_
     */
    static getNonIndexes(): string[] {
        let keys = this.getAttributesCore(false)
        return keys;
    }

    /**
     * Returns only primary and foreign key indexes
     * 
     * e.g. _['userId', 'roleId']_
     */
    static getIndexes(): string[] {
        let keys = this.getAttributesCore(true)
        return keys;
    }

    /**
     * Returns all columns on model
     * 
     * e.g. _['userId', 'username', 'email', 'password']_
     */
    static getAttributes(): string[] {
        let keys = this.getAttributesCore()
        return keys;
    }

    /**
     * Checks if column is primary key or foreign key
     */
    private static isIndex(column: ModelAttributeColumnOptions) {
        return !!(column.primaryKey || column.references)
    }

    /**
     * Returns attributes on model
     * 
     * * indexes = undefined => all columns of model
     * * indexes = true => only primary key and foreign key columns
     * * indexes = false => all columns except primary key and foreign key columns
     */
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