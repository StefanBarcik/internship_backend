import {Model, Sequelize, DataTypes, EnumDataType, DoubleDataType} from "sequelize";
import {Models} from "../index";
import {DiagnoseModel} from "./diagnose";

export class SubstanceModel extends Model {
    id: number
    name: string
    timeUnit: EnumDataType<any>
    halfLife: DoubleDataType

    // foreign keys

    diagnose: DiagnoseModel[]
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
                type: DataTypes.ENUM('SECOND', 'MINUTE', 'HOUR', 'DAY'),
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

    (SubstanceModel as any).associate = (models : Models) => {
        SubstanceModel.hasMany(models.Diagnose, { foreignKey: 'substanceID' })
    }

    return SubstanceModel
}