import { DataTypes, Model, Sequelize } from 'sequelize';
import AddressBookCategory from '@interfaces/address-book-category.interface';

export class AddressBookCategoryModel extends Model implements AddressBookCategory {
  public id: number;
  public municipalityId: number;
  public nameEn: string;
  public nameDe: string;
  public createdBy: number;
  public isDeleted: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof AddressBookCategoryModel {
  return AddressBookCategoryModel.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      municipalityId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'municipality',
          key: 'id',
        },
      },
      nameEn: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      nameDe: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'admin',
          key: 'id',
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      tableName: 'address_book_category',
      sequelize,
      defaultScope: { attributes: { exclude: ['createdBy', 'isDeleted', 'createdAt', 'updatedAt'] } },
    },
  );
}
