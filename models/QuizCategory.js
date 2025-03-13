import mongoose from "mongoose";

const QuizCategoryModel = new mongoose.Schema({

    name : {
        type: String,
        required: 'true',
        unique: true,
    },
    description : {
        type: String,
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
export default mongoose.model('QuizCategory', QuizCategoryModel);
