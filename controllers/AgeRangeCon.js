import AgeRange from "../models/AgeRange.js";
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

export async function createAgerange(req,res){
    try{
        const { identifier, minAge, maxAge, status, createdByID, updatedByID } = req.body;
        
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
        const existingAgerange = await AgeRange.findOne({identifier})

        if(existingAgerange){
            return res.status(400).json({
                status:"Failed",
                data:[],
                message:"Agerange already exists."
            })
        }

        const newAgerange = new AgeRange({
            identifier,
			minAge,
			maxAge,
			status,
			createdByID,
			updatedByID
        });
        
        const savedAgerange = await newAgerange.save();
        const dataToSend = await AgeRange.findById(savedAgerange._id).exec();
        
        res.status(200).json({
            status: "Success",
            data: dataToSend._doc,
            message: "Agerange created Successfully!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: "+ e
        })
    }
}

// function to update AgeRange a entry by id
export async function updateAgerange(req,res){
    try{
        const { _id, identifier, minAge, maxAge, status, createdByID, updatedByID } = req.body;

        let existingAgerange = await AgeRange.findById(_id);
        if(!existingAgerange){
            return res.status(404).json({
                staus: "Failed",
                message : "So such Agerange with id "+_id+" exists."
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

        dataToSend = await AgeRange.findAndUpdateById(_id,{identifier, minAge, maxAge, status, createdByID, updatedByID});
        return res.status(200).json({
            status: "Success",
            message: "Agerange with id "+_id+" updated successfully.",
            data: dataToSend._doc,
        });
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

export async function findAgerange(req,res){
    try{
        const { _id } = req.body;
        const existingAgerange = await AgeRange.findById(_id);
        if(!existingAgerange){
            return res.status(401).json({
                status:"Failed",
                message:"Agerange with id "+_id+" doesn't exist"
            })
        }
        
        res.status(200).json({
            status:"Success",
            data: existingAgerange._doc,
            message: "Successful search!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

// function to list whole AgeRange data
export async function listAgerange(req,res){
    try{
        const dataToSend = await AgeRange.find().exec();
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
export async function deleteAgerange(req,res){
    try{
        const { _id } = req.body;
        let existAgerange = await AgeRange.findOne({ _id });
        if(!existAgerange){
            return res.status(401).json({
                status:"Failed",
                message:"Can't find Agerange with ID: "+_id
            });
        }
        await AgeRange.findOneAndDelete({ _id });
        res.status(200).json({
            status:"Success",
            message:"Agerange Deleted Successfully."
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}
