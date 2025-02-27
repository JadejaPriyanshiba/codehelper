import car from "../models/car.js";
    import cars from "../models/cars.js";        
    import user from "../models/user.js";        
    
// function to check if a foriegn key exists for (cars)
async function getCars(res, carsID){
    let obj = await cars.findById(carsID);
    if(!obj){
        return res.status(404).json({
            status:"Failed",
            message:"Cars not found."
        });
    }else{
        return 0;
    }
}

// function to check if a foriegn key exists for (user)
async function getUser(res, userID){
    let obj = await user.findById(userID);
    if(!obj){
        return res.status(404).json({
            status:"Failed",
            message:"User not found."
        });
    }else{
        return 0;
    }
}

export async function createCar(req,res){
    try{
        const { model, companyID, OwnerID, number_plate } = req.body;
        
        isCarsExists = await getCars(res, companyID);
        if(isCarsExists != 0){
            res = isCarsExists;
            return res;
        }

        isUserExists = await getUser(res, OwnerID);
        if(isUserExists != 0){
            res = isUserExists;
            return res;
        }

        // change this if you have one uniquw key in your table
        const existingCar = await car.findOne({model, companyID, OwnerID, number_plate})

        if(existingCar){
            return res.status(400).json({
                status:"Failed",
                data:[],
                message:"Car already exists."
            })
        }

        const newCar = new car({
            model,
			companyID,
			OwnerID,
			number_plate
        });
        
        const savedCar = await newCar.save();
        const dataToSend = await car.findById(savedCar._id).exec();
        
        res.status(200).json({
            status: "Success",
            data: dataToSend._doc,
            message: "Car created Successfully!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: "+ e
        })
    }
}

// function to update car a entry by id
export async function updateCar(req,res){
    try{
        const { _id, model, companyID, OwnerID, number_plate } = req.body;

        let existingCar = await car.findById(_id);
        if(!existingCar){
            return res.status(404).json({
                staus: "Failed",
                message : "So such Car with id "+_id+" exists."
            });
        }


        isCarsExists = await getCars(res, companyID);
        if(isCarsExists != 0){
            res = isCarsExists;
            return res;
        }

        isUserExists = await getUser(res, OwnerID);
        if(isUserExists != 0){
            res = isUserExists;
            return res;
        }

        dataToSend = await car.findAndUpdateById(_id,{model, companyID, OwnerID, number_plate});
        return res.status(200).json({
            status: "Success",
            message: "Car with id "+_id+" updated successfully.",
            data: dataToSend._doc,
        });
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

export async function findCar(req,res){
    try{
        const { _id } = req.body;
        const existingCar = await car.findById(_id);
        if(!existingCar){
            return res.status(401).json({
                status:"Failed",
                message:"Car with id "+_id+" doesn't exist"
            })
        }
        
        res.status(200).json({
            status:"Success",
            data: existingCar._doc,
            message: "Successful search!"
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}

// function to list whole car data
export async function listCar(req,res){
    try{
        const dataToSend = await car.find().exec();
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
export async function deleteCar(req,res){
    try{
        const { _id } = req.body;
        let existCar = await car.findOne({ _id });
        if(!existCar){
            return res.status(401).json({
                status:"Failed",
                message:"Can't find Car with ID: "+_id
            });
        }
        await car.findOneAndDelete({ _id });
        res.status(200).json({
            status:"Success",
            message:"Car Deleted Successfully."
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"Internal server error: " + e
        });
    }
}
