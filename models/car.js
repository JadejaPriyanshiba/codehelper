import mongoose from "mongoose";
    
    const carModel = new mongoose.Schema({
    
        model : {
            type: String,
            required: 'Model name is required',
        },
        companyID : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cars',
        },
        OwnerID : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        number_plate : {
            type: Number,
            required: 'Number plate us required',
        },
    },{
        timestamps: true,
        versionKey:false,
        minimize: false
    });
    export default mongoose.model('car', carModel);
    