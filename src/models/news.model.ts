import News from '@/interfaces/news.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class NewsModel extends Model implements News {
  public id: number;
  public municipalityId: number;
  public titleEn: string;
  public titleDe: string;
  public contentEn: string;
  public contentDe: string;
  public date: string;
  public type: number;
  public imgName: string[];
  public createdBy: number;
  public isDeleted: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof NewsModel {
  return NewsModel.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      municipalityId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'municipality',
          key: 'id',
        },
      },
      titleEn: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      titleDe: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contentEn: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contentDe: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      imgName: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER,
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
      tableName: 'news',
      sequelize,
      defaultScope: { attributes: { exclude: ['createdBy', 'isDeleted', 'createdAt', 'updatedAt'] } },
    },
  );
}
