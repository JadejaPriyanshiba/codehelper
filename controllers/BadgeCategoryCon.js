import BadgeCategory from "../models/BadgeCategory.js";
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

export async function createBadgecategory(req,res){
    try{
        const { name, description, status, createdByID, updatedByID } = req.body;
        
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
        const existingBadgecategory = await BadgeCategory.findOne({name})

        if(existingBadgecategory){
            return res.status(400).json({
                status:"Failed",
                data:[],
                message:"Badgecategory already exists."
            })
        }

        const newBadgecategory = new BadgeCategory({
            name,
			description,
			status,
			createdByID,
			updatedByID
        });
        
        const savedBadgecategory = await newBadgecategory.save();
        const dataToSend = await BadgeCategory.findById(savedBadgecategory._id).exec();
        
        res.status(200).json({
            status: "Success",
            data: dataToSend._doc,
            message: "Badgecategory created Successfully!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: "+ e
        })
    }
}

// function to update BadgeCategory a entry by id
export async function updateBadgecategory(req,res){
    try{
        const { _id, name, description, status, createdByID, updatedByID } = req.body;

        let existingBadgecategory = await BadgeCategory.findById(_id);
        if(!existingBadgecategory){
            return res.status(404).json({
                staus: "Failed",
                message : "So such Badgecategory with id "+_id+" exists."
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

        dataToSend = await BadgeCategory.findAndUpdateById(_id,{name, description, status, createdByID, updatedByID});
        return res.status(200).json({
            status: "Success",
            message: "Badgecategory with id "+_id+" updated successfully.",
            data: dataToSend._doc,
        });
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

export async function findBadgecategory(req,res){
    try{
        const { _id } = req.body;
        const existingBadgecategory = await BadgeCategory.findById(_id);
        if(!existingBadgecategory){
            return res.status(401).json({
                status:"Failed",
                message:"Badgecategory with id "+_id+" doesn't exist"
            })
        }
        
        res.status(200).json({
            status:"Success",
            data: existingBadgecategory._doc,
            message: "Successful search!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

// function to list whole BadgeCategory data
export async function listBadgecategory(req,res){
    try{
        const dataToSend = await BadgeCategory.find().exec();
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
export async function deleteBadgecategory(req,res){
    try{
        const { _id } = req.body;
        let existBadgecategory = await BadgeCategory.findOne({ _id });
        if(!existBadgecategory){
            return res.status(401).json({
                status:"Failed",
                message:"Can't find Badgecategory with ID: "+_id
            });
        }
        await BadgeCategory.findOneAndDelete({ _id });
        res.status(200).json({
            status:"Success",
            message:"Badgecategory Deleted Successfully."
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}
