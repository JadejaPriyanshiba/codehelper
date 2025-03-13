import mongoose from "mongoose";

const NoticationCategoryModel = new mongoose.Schema({

    name : {
        type: String,
        required: 'true',
        unique: true,
        },
    description : {
        type: String,
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
export default mongoose.model('NoticationCategory', NoticationCategoryModel);
