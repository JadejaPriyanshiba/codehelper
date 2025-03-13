import PollCategory from "../models/PollCategory.js";
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

export async function createPollcategory(req,res){
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
        const existingPollcategory = await PollCategory.findOne({name})

        if(existingPollcategory){
            return res.status(400).json({
                status:"Failed",
                data:[],
                message:"Pollcategory already exists."
            })
        }

        const newPollcategory = new PollCategory({
            name,
			description,
			status,
			createdByID,
			updatedByID
        });
        
        const savedPollcategory = await newPollcategory.save();
        const dataToSend = await PollCategory.findById(savedPollcategory._id).exec();
        
        res.status(200).json({
            status: "Success",
            data: dataToSend._doc,
            message: "Pollcategory created Successfully!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: "+ e
        })
    }
}

// function to update PollCategory a entry by id
export async function updatePollcategory(req,res){
    try{
        const { _id, name, description, status, createdByID, updatedByID } = req.body;

        let existingPollcategory = await PollCategory.findById(_id);
        if(!existingPollcategory){
            return res.status(404).json({
                staus: "Failed",
                message : "So such Pollcategory with id "+_id+" exists."
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

        dataToSend = await PollCategory.findAndUpdateById(_id,{name, description, status, createdByID, updatedByID});
        return res.status(200).json({
            status: "Success",
            message: "Pollcategory with id "+_id+" updated successfully.",
            data: dataToSend._doc,
        });
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

export async function findPollcategory(req,res){
    try{
        const { _id } = req.body;
        const existingPollcategory = await PollCategory.findById(_id);
        if(!existingPollcategory){
            return res.status(401).json({
                status:"Failed",
                message:"Pollcategory with id "+_id+" doesn't exist"
            })
        }
        
        res.status(200).json({
            status:"Success",
            data: existingPollcategory._doc,
            message: "Successful search!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

// function to list whole PollCategory data
export async function listPollcategory(req,res){
    try{
        const dataToSend = await PollCategory.find().exec();
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
export async function deletePollcategory(req,res){
    try{
        const { _id } = req.body;
        let existPollcategory = await PollCategory.findOne({ _id });
        if(!existPollcategory){
            return res.status(401).json({
                status:"Failed",
                message:"Can't find Pollcategory with ID: "+_id
            });
        }
        await PollCategory.findOneAndDelete({ _id });
        res.status(200).json({
            status:"Success",
            message:"Pollcategory Deleted Successfully."
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}
