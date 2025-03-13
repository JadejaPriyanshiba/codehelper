import QuizCategory from "../models/QuizCategory.js";
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

export async function createQuizcategory(req,res){
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
        const existingQuizcategory = await QuizCategory.findOne({name})

        if(existingQuizcategory){
            return res.status(400).json({
                status:"Failed",
                data:[],
                message:"Quizcategory already exists."
            })
        }

        const newQuizcategory = new QuizCategory({
            name,
			description,
			status,
			createdByID,
			updatedByID
        });
        
        const savedQuizcategory = await newQuizcategory.save();
        const dataToSend = await QuizCategory.findById(savedQuizcategory._id).exec();
        
        res.status(200).json({
            status: "Success",
            data: dataToSend._doc,
            message: "Quizcategory created Successfully!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: "+ e
        })
    }
}

// function to update QuizCategory a entry by id
export async function updateQuizcategory(req,res){
    try{
        const { _id, name, description, status, createdByID, updatedByID } = req.body;

        let existingQuizcategory = await QuizCategory.findById(_id);
        if(!existingQuizcategory){
            return res.status(404).json({
                staus: "Failed",
                message : "So such Quizcategory with id "+_id+" exists."
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

        dataToSend = await QuizCategory.findAndUpdateById(_id,{name, description, status, createdByID, updatedByID});
        return res.status(200).json({
            status: "Success",
            message: "Quizcategory with id "+_id+" updated successfully.",
            data: dataToSend._doc,
        });
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

export async function findQuizcategory(req,res){
    try{
        const { _id } = req.body;
        const existingQuizcategory = await QuizCategory.findById(_id);
        if(!existingQuizcategory){
            return res.status(401).json({
                status:"Failed",
                message:"Quizcategory with id "+_id+" doesn't exist"
            })
        }
        
        res.status(200).json({
            status:"Success",
            data: existingQuizcategory._doc,
            message: "Successful search!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

// function to list whole QuizCategory data
export async function listQuizcategory(req,res){
    try{
        const dataToSend = await QuizCategory.find().exec();
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
export async function deleteQuizcategory(req,res){
    try{
        const { _id } = req.body;
        let existQuizcategory = await QuizCategory.findOne({ _id });
        if(!existQuizcategory){
            return res.status(401).json({
                status:"Failed",
                message:"Can't find Quizcategory with ID: "+_id
            });
        }
        await QuizCategory.findOneAndDelete({ _id });
        res.status(200).json({
            status:"Success",
            message:"Quizcategory Deleted Successfully."
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}
