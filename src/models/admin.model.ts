import { Admin } from '@/interfaces/admin.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class AdminModel extends Model implements Admin {
  public id: number;
  public municipalityId: number;
  public name: string;
  public email: string;
  public address: string;
  public password: string;
  public isDeleted: boolean;
  public fpToken: string;
  public fpDuration: Date;
  public createdBy: number;
  public updatedBy: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof AdminModel {
  return AdminModel.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      fpToken: {
        type: DataTypes.STRING(24),
        allowNull: false,
      },
      fpDuration: {
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
      updatedBy: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'admin',
          key: 'id',
        },
      },
    },
    {
      tableName: 'admin',
      sequelize,
      defaultScope: { attributes: { exclude: ['createdBy', 'isDeleted', 'createdAt', 'updatedAt'] } },
    },
  );
}
