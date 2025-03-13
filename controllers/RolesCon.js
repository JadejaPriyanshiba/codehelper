import Roles from "../models/Roles.js";
    import Users from "../models/Users.js";        
    import Users from "../models/Users.js";        
    
// function to check if a foriegn key exists for (Users)
async function getUsers(res, UsersID){
    let obj = await Users.findById(UsersID);
    if(!obj){
        return res.status(404).json({
            status:"Failed",
            message:"Users not found."
        });
    }else{
        return 0;
    }
}

// function to check if a foriegn key exists for (Users)
async function getUsers(res, UsersID){
    let obj = await Users.findById(UsersID);
    if(!obj){
        return res.status(404).json({
            status:"Failed",
            message:"Users not found."
        });
    }else{
        return 0;
    }
}

export async function createRoles(req,res){
    try{
        const { roleName, status, createdByID, updatedByID } = req.body;
        
        isUsersExists = await getUsers(res, createdByID);
        if(isUsersExists != 0){
            res = isUsersExists;
            return res;
        }

        isUsersExists = await getUsers(res, updatedByID);
        if(isUsersExists != 0){
            res = isUsersExists;
            return res;
        }

        // change this if you have one uniquw key in your table
        const existingRoles = await Roles.findOne({roleName})

        if(existingRoles){
            return res.status(400).json({
                status:"Failed",
                data:[],
                message:"Roles already exists."
            })
        }

        const newRoles = new Roles({
            roleName,
			status,
			createdByID,
			updatedByID
        });
        
        const savedRoles = await newRoles.save();
        const dataToSend = await Roles.findById(savedRoles._id).exec();
        
        res.status(200).json({
            status: "Success",
            data: dataToSend._doc,
            message: "Roles created Successfully!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: "+ e
        })
    }
}

// function to update Roles a entry by id
export async function updateRoles(req,res){
    try{
        const { _id, roleName, status, createdByID, updatedByID } = req.body;

        let existingRoles = await Roles.findById(_id);
        if(!existingRoles){
            return res.status(404).json({
                staus: "Failed",
                message : "So such Roles with id "+_id+" exists."
            });
        }


        isUsersExists = await getUsers(res, createdByID);
        if(isUsersExists != 0){
            res = isUsersExists;
            return res;
        }

        isUsersExists = await getUsers(res, updatedByID);
        if(isUsersExists != 0){
            res = isUsersExists;
            return res;
        }

        dataToSend = await Roles.findAndUpdateById(_id,{roleName, status, createdByID, updatedByID});
        return res.status(200).json({
            status: "Success",
            message: "Roles with id "+_id+" updated successfully.",
            data: dataToSend._doc,
        });
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

export async function findRoles(req,res){
    try{
        const { _id } = req.body;
        const existingRoles = await Roles.findById(_id);
        if(!existingRoles){
            return res.status(401).json({
                status:"Failed",
                message:"Roles with id "+_id+" doesn't exist"
            })
        }
        
        res.status(200).json({
            status:"Success",
            data: existingRoles._doc,
            message: "Successful search!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

// function to list whole Roles data
export async function listRoles(req,res){
    try{
        const dataToSend = await Roles.find().exec();
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
export async function deleteRoles(req,res){
    try{
        const { _id } = req.body;
        let existRoles = await Roles.findOne({ _id });
        if(!existRoles){
            return res.status(401).json({
                status:"Failed",
                message:"Can't find Roles with ID: "+_id
            });
        }
        await Roles.findOneAndDelete({ _id });
        res.status(200).json({
            status:"Success",
            message:"Roles Deleted Successfully."
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}
