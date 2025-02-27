import user from "../models/user.js";
    
export async function createUser(req,res){
    try{
        const { name, email, contact, desc } = req.body;
        
        // change this if you have one uniquw key in your table
        const existingUser = await user.findOne({email})

        if(existingUser){
            return res.status(400).json({
                status:"Failed",
                data:[],
                message:"User already exists."
            })
        }

        const newUser = new user({
            name,
			email,
			contact,
			desc
        });
        
        const savedUser = await newUser.save();
        const dataToSend = await user.findById(savedUser._id).exec();
        
        res.status(200).json({
            status: "Success",
            data: dataToSend._doc,
            message: "User created Successfully!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: "+ e
        })
    }
}

// function to update user a entry by id
export async function updateUser(req,res){
    try{
        const { _id, name, email, contact, desc } = req.body;

        let existingUser = await user.findById(_id);
        if(!existingUser){
            return res.status(404).json({
                staus: "Failed",
                message : "So such User with id "+_id+" exists."
            });
        }


        dataToSend = await user.findAndUpdateById(_id,{name, email, contact, desc});
        return res.status(200).json({
            status: "Success",
            message: "User with id "+_id+" updated successfully.",
            data: dataToSend._doc,
        });
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

export async function findUser(req,res){
    try{
        const { _id } = req.body;
        const existingUser = await user.findById(_id);
        if(!existingUser){
            return res.status(401).json({
                status:"Failed",
                message:"User with id "+_id+" doesn't exist"
            })
        }
        
        res.status(200).json({
            status:"Success",
            data: existingUser._doc,
            message: "Successful search!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

// function to list whole user data
export async function listUser(req,res){
    try{
        const dataToSend = await user.find().exec();
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
export async function deleteUser(req,res){
    try{
        const { _id } = req.body;
        let existUser = await user.findOne({ _id });
        if(!existUser){
            return res.status(401).json({
                status:"Failed",
                message:"Can't find User with ID: "+_id
            });
        }
        await user.findOneAndDelete({ _id });
        res.status(200).json({
            status:"Success",
            message:"User Deleted Successfully."
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}
