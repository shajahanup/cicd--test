import { Municipality } from '@/interfaces/municipality.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class MunicipalityModel extends Model implements Municipality {
  public id: number;
  public name: string;
  public totalArea: string;
  public zipCode: string;
  public addressBookLastUpdated: Date;
  public eventsLastUpdated: Date;
  public newsLastUpdated: Date;
  public offerslastUpdated: Date;
  public adminLastUpdated: Date;
  public mayorLastUpdated: Date;
  public createdBy: number;
  public district: string;
  public isDeleted: boolean;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default function (sequelize: Sequelize): typeof MunicipalityModel {
  MunicipalityModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      createdBy: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'admin',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      totalArea: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING(5),
        unique: true,
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      addressBookLastUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      eventsLastUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      newsLastUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      offerslastUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      adminLastUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      mayorLastUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'municipality',
      sequelize,
      defaultScope: { attributes: { exclude: ['createdBy', 'isDeleted', 'createdAt', 'updatedAt'] } },
    },
  );

  return MunicipalityModel;
}
