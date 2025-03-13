import Admins from "../models/Admins.js";
    
export async function createAdmins(req,res){
    try{
        const { firstName, lastName, status } = req.body;
        
        // change this if you have one uniquw key in your table
        const existingAdmins = await Admins.findOne({firstName, lastName, status})

        if(existingAdmins){
            return res.status(400).json({
                status:"Failed",
                data:[],
                message:"Admins already exists."
            })
        }

        const newAdmins = new Admins({
            firstName,
			lastName,
			status
        });
        
        const savedAdmins = await newAdmins.save();
        const dataToSend = await Admins.findById(savedAdmins._id).exec();
        
        res.status(200).json({
            status: "Success",
            data: dataToSend._doc,
            message: "Admins created Successfully!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: "+ e
        })
    }
}

// function to update Admins a entry by id
export async function updateAdmins(req,res){
    try{
        const { _id, firstName, lastName, status } = req.body;

        let existingAdmins = await Admins.findById(_id);
        if(!existingAdmins){
            return res.status(404).json({
                staus: "Failed",
                message : "So such Admins with id "+_id+" exists."
            });
        }


        dataToSend = await Admins.findAndUpdateById(_id,{firstName, lastName, status});
        return res.status(200).json({
            status: "Success",
            message: "Admins with id "+_id+" updated successfully.",
            data: dataToSend._doc,
        });
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

export async function findAdmins(req,res){
    try{
        const { _id } = req.body;
        const existingAdmins = await Admins.findById(_id);
        if(!existingAdmins){
            return res.status(401).json({
                status:"Failed",
                message:"Admins with id "+_id+" doesn't exist"
            })
        }
        
        res.status(200).json({
            status:"Success",
            data: existingAdmins._doc,
            message: "Successful search!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

// function to list whole Admins data
export async function listAdmins(req,res){
    try{
        const dataToSend = await Admins.find().exec();
        res.status(200).json({
            status:"Success",
            data: dataToSend,
            message:"Successful search"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

// function to delete
export async function deleteAdmins(req,res){
    try{
        const { _id } = req.body;
        let existAdmins = await Admins.findOne({ _id });
        if(!existAdmins){
            return res.status(401).json({
                status:"Failed",
                message:"Can't find Admins with ID: "+_id
            });
        }
        await Admins.findOneAndDelete({ _id });
        res.status(200).json({
            status:"Success",
            message:"Admins Deleted Successfully."
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}
