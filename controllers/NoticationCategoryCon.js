import NoticationCategory from "../models/NoticationCategory.js";
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

export async function createNoticationcategory(req,res){
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
        const existingNoticationcategory = await NoticationCategory.findOne({name})

        if(existingNoticationcategory){
            return res.status(400).json({
                status:"Failed",
                data:[],
                message:"Noticationcategory already exists."
            })
        }

        const newNoticationcategory = new NoticationCategory({
            name,
			description,
			status,
			createdByID,
			updatedByID
        });
        
        const savedNoticationcategory = await newNoticationcategory.save();
        const dataToSend = await NoticationCategory.findById(savedNoticationcategory._id).exec();
        
        res.status(200).json({
            status: "Success",
            data: dataToSend._doc,
            message: "Noticationcategory created Successfully!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: "+ e
        })
    }
}

// function to update NoticationCategory a entry by id
export async function updateNoticationcategory(req,res){
    try{
        const { _id, name, description, status, createdByID, updatedByID } = req.body;

        let existingNoticationcategory = await NoticationCategory.findById(_id);
        if(!existingNoticationcategory){
            return res.status(404).json({
                staus: "Failed",
                message : "So such Noticationcategory with id "+_id+" exists."
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

        dataToSend = await NoticationCategory.findAndUpdateById(_id,{name, description, status, createdByID, updatedByID});
        return res.status(200).json({
            status: "Success",
            message: "Noticationcategory with id "+_id+" updated successfully.",
            data: dataToSend._doc,
        });
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

export async function findNoticationcategory(req,res){
    try{
        const { _id } = req.body;
        const existingNoticationcategory = await NoticationCategory.findById(_id);
        if(!existingNoticationcategory){
            return res.status(401).json({
                status:"Failed",
                message:"Noticationcategory with id "+_id+" doesn't exist"
            })
        }
        
        res.status(200).json({
            status:"Success",
            data: existingNoticationcategory._doc,
            message: "Successful search!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

// function to list whole NoticationCategory data
export async function listNoticationcategory(req,res){
    try{
        const dataToSend = await NoticationCategory.find().exec();
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
export async function deleteNoticationcategory(req,res){
    try{
        const { _id } = req.body;
        let existNoticationcategory = await NoticationCategory.findOne({ _id });
        if(!existNoticationcategory){
            return res.status(401).json({
                status:"Failed",
                message:"Can't find Noticationcategory with ID: "+_id
            });
        }
        await NoticationCategory.findOneAndDelete({ _id });
        res.status(200).json({
            status:"Success",
            message:"Noticationcategory Deleted Successfully."
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}
