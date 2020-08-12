import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Visualization extends Model {
    static associate(models) {
      Visualization.belongsTo(models.User);
    }
  }
  Visualization.init(
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.ENUM(['LINE_CHART', 'BAR_CHART', 'TABLE']),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      config: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Visualization',
    }
  );
  return Visualization;
};