import {Model, Sequelize, DataTypes, EnumDataType} from "sequelize";


export class UserModel extends Model {
    id: number
   // name: string
    role: EnumDataType<any>
    patientID: number
}

export default (sequelize: Sequelize, modelName: string) => {
    UserModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
            },
            /*
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },*/

            role: {
                type: DataTypes.ENUM('USER', 'ADMIN', 'SUPER_ADMIN'),
                allowNull: false,
            },
            patientID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName,
            tableName: 'users',
        }
    );


    /*(UserModel as any).associate = (models: Models) => {
        //PatientModel.belongsTo(models.Diagnose, { foreignKey: 'diagnoseID' })
    }*/

    return UserModel
}