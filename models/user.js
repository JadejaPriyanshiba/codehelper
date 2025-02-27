import mongoose from "mongoose";

const userModel = new mongoose.Schema({

    name : {
        type: String,
        required: 'name is required',
        },
    email : {
        type: String,
        required: 'email is required',
        unique: true,
        },
    contact : {
        type: Number,
        unique: true,
        },
    desc : {
        type: String,
        default: default describtion,
        },
},{
    timestamps: true,
    versionKey:false,
    minimize: false
});
export default mongoose.model('user', userModel);
