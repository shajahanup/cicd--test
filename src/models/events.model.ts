import Events from '@/interfaces/events.interface';
import Location from '@/interfaces/location.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class EventsModel extends Model implements Events {
  public id: number;
  public municipalityId: number;
  public startDate: string;
  public endDate: string;
  public titleEn: string;
  public titleDe: string;
  public noteEn: string;
  public noteDe: string;
  public location: Location;
  public address: string;
  public createdBy: number;
  public isDeleted: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof EventsModel {
  return EventsModel.init(
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
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      titleEn: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      titleDe: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      noteEn: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false,
      },
      noteDe: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
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
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'events',
      sequelize,
      defaultScope: { attributes: { exclude: ['createdBy', 'isDeleted', 'createdAt', 'updatedAt'] } },
    },
  );
}
