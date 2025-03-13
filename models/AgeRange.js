import mongoose from "mongoose";

const AgeRangeModel = new mongoose.Schema({

    identifier : {
        type: String,
        required: 'true',
        unique: true,
    },
    minAge : {
        type: Number,
        required: 'true',
    },
    maxAge : {
        type: Number,
        required: 'true',
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
export default mongoose.model('AgeRange', AgeRangeModel);
