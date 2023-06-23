import AddressBook from '@/interfaces/address-book.interface';
import Location from '@/interfaces/location.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { WorkTime } from '@interfaces/work-time.interface';

export class AddressBookModel extends Model implements AddressBook {
  public id: number;
  public municipalityId: number;
  public categoryId: number;
  public name: string;
  public workTime: [WorkTime];
  public location: Location;
  public address: string;
  public phone: number;
  public createdBy: number;
  public isDeleted: boolean;
  public isEmergency: boolean;
  public notesEn: string;
  public notesDe: string;
  public multiDates: string[];
  public tags: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof AddressBookModel {
  return AddressBookModel.init(
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
      categoryId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'address_book_category',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      workTime: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      location: {
        type: 'POINT',
        allowNull: false,
        get() {
          const location = this.getDataValue('location');
          const latitude = location?.x;
          const longitude = location?.y;
          return {
            latitude: latitude?.toString(),
            longitude: longitude?.toString(),
          };
        },
      },
      phone: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(512),
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
      isEmergency: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      multiDates: {
        type: DataTypes.ARRAY(DataTypes.DATE),
        allowNull: false,
        defaultValue: [],
      },
      notesEn: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      notesDe: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      tableName: 'address_book',
      sequelize,
      defaultScope: { attributes: { exclude: ['createdBy', 'isDeleted', 'createdAt', 'updatedAt'] } },
    },
  );
}
