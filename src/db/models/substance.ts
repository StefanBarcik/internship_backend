import {Model, Sequelize, DataTypes, EnumDataType, DoubleDataType} from "sequelize";

export class SubstanceModel extends Model {
    id: number
    name: string
    timeUnit: EnumDataType<any>
    halfLife: DoubleDataType

    // foreign keys
}

export default (sequelize: Sequelize, modelName: string) => {
    SubstanceModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            timeUnit: {
                type: DataTypes.ENUM('1','2'),
                allowNull: false,
            },
            halfLife: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            // foreign keys
        },
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName,
            tableName: 'substances',
        }
    );


    (SubstanceModel as any).associate = (models : any) => {
        SubstanceModel.hasOne(models.Diagnose, { foreignKey: 'SubstanceID' })
    }

    return SubstanceModel
}