import mongoose from "mongoose";

const AdminsModel = new mongoose.Schema({

    firstName : {
        type: String,
        required: 'true',
    },
    lastName : {
        type: String,
        required: 'true',
    },
    status : {
        type: String,
        default: Active,
    },
},{
    timestamps: true,
    versionKey:false,
    minimize: false
});
export default mongoose.model('Admins', AdminsModel);
