import NewsCategory from "../models/NewsCategory.js";
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

export async function createNewscategory(req,res){
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
        const existingNewscategory = await NewsCategory.findOne({name})

        if(existingNewscategory){
            return res.status(400).json({
                status:"Failed",
                data:[],
                message:"Newscategory already exists."
            })
        }

        const newNewscategory = new NewsCategory({
            name,
			description,
			status,
			createdByID,
			updatedByID
        });
        
        const savedNewscategory = await newNewscategory.save();
        const dataToSend = await NewsCategory.findById(savedNewscategory._id).exec();
        
        res.status(200).json({
            status: "Success",
            data: dataToSend._doc,
            message: "Newscategory created Successfully!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: "+ e
        })
    }
}

// function to update NewsCategory a entry by id
export async function updateNewscategory(req,res){
    try{
        const { _id, name, description, status, createdByID, updatedByID } = req.body;

        let existingNewscategory = await NewsCategory.findById(_id);
        if(!existingNewscategory){
            return res.status(404).json({
                staus: "Failed",
                message : "So such Newscategory with id "+_id+" exists."
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

        dataToSend = await NewsCategory.findAndUpdateById(_id,{name, description, status, createdByID, updatedByID});
        return res.status(200).json({
            status: "Success",
            message: "Newscategory with id "+_id+" updated successfully.",
            data: dataToSend._doc,
        });
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

export async function findNewscategory(req,res){
    try{
        const { _id } = req.body;
        const existingNewscategory = await NewsCategory.findById(_id);
        if(!existingNewscategory){
            return res.status(401).json({
                status:"Failed",
                message:"Newscategory with id "+_id+" doesn't exist"
            })
        }
        
        res.status(200).json({
            status:"Success",
            data: existingNewscategory._doc,
            message: "Successful search!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

// function to list whole NewsCategory data
export async function listNewscategory(req,res){
    try{
        const dataToSend = await NewsCategory.find().exec();
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
export async function deleteNewscategory(req,res){
    try{
        const { _id } = req.body;
        let existNewscategory = await NewsCategory.findOne({ _id });
        if(!existNewscategory){
            return res.status(401).json({
                status:"Failed",
                message:"Can't find Newscategory with ID: "+_id
            });
        }
        await NewsCategory.findOneAndDelete({ _id });
        res.status(200).json({
            status:"Success",
            message:"Newscategory Deleted Successfully."
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}
