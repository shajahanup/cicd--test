import Offers from '@/interfaces/offers.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class OffersModel extends Model implements Offers {
  public id: number;
  public municipalityId: number;
  public establishment: string;
  public descriptionEn: string;
  public descriptionDe: string;
  public phone: number;
  public website: string;
  public imgName: string;
  public location: string;
  public address: string;
  public beginsOn: string;
  public expiryOn: string;
  public createdBy: number;
  public isDeleted: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof OffersModel {
  return OffersModel.init(
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
      establishment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionEn: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      descriptionDe: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      address: {
        type: DataTypes.STRING,
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
      beginsOn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expiryOn: {
        type: DataTypes.DATE,
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
      tableName: 'offers',
      sequelize,
      defaultScope: { attributes: { exclude: ['createdBy', 'isDeleted', 'createdAt', 'updatedAt'] } },
    },
  );
}
