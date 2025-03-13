import mongoose from "mongoose";

const RolesModel = new mongoose.Schema({

    roleName : {
        type: String,
        required: 'true',
        unique: true,
        },
    status : {
        type: String,
        default: Active,
        },
    createdByID : {
        type: mongoose.Schema.Types.ObjectId,
        required: 'true',
        ref: 'Users',
        },
    updatedByID : {
        type: mongoose.Schema.Types.ObjectId,
        required: 'true',
        ref: 'Users',
        },
},{
    timestamps: true,
    versionKey:false,
    minimize: false
});
export default mongoose.model('Roles', RolesModel);
