import Mayor from '@/interfaces/mayor.interface';
import { WorkTime } from '@/interfaces/work-time.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class MayorModel extends Model implements Mayor {
  public id: number;
  public municipalityId: number;
  public name: string;
  public introductionEn: string;
  public introductionDe: string;
  public designationEn: string;
  public designationDe: string;
  public imgName: string;
  public phone: string;
  public fax: string;
  public email: string;
  public timing: [WorkTime];
  public address: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof MayorModel {
  return MayorModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      municipalityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'municipality',
          },
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      imgName: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      introductionEn: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      introductionDe: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      designationEn: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      designationDe: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      fax: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      timing: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(512),
        allowNull: false,
      },
    },
    {
      tableName: 'mayor',
      sequelize,
      defaultScope: { attributes: { exclude: ['createdBy', 'isDeleted', 'createdAt', 'updatedAt'] } },
    },
  );
}
