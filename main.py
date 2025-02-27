# Online Python compiler (interpreter) to run Python online.# Write Python 3 code in this online editor and run it.
import os
def makeSchema(tbname, takeInput,fieldnames, fieldtype, isunique, required, default, ref, fulfieldnames):
    modelOut = '''import mongoose from "mongoose";
    '''

    if(takeInput):
        tbname = input("Enter schema name: ")

    conOut = '''import %s from "../models/%s.js";
    '''%(tbname, tbname)
    conimports =''''''
    confunc = ''''''
    conCreateFunc=''''''
    conUpdateFunc=''''''
    conFindFunc=''''''
    conListFunc=''''''
    conDeleteFunc=''''''

    modelOut += '''
    const %sModel = new mongoose.Schema({
    '''%(tbname)
    if(takeInput):
        fieldnames = []
        fulfieldnames = []
        fieldtype = []
        required = []
        isunique = []
        default = []
        ref = []
    # takeinput = int(input("Do you enter fields field through input of by direct code changes? (1/0): "))
    if takeInput:
        print("Leave field blank if not applicable\nenter 0 in field name to stop the loop")
    while (takeInput):
        print("For field",len(fieldnames))
        fn = input("Enter field name: ")
        if(fn=='0'):
            break
        fieldnames.append(fn)
        ffn = input("Enter flutter field name: ")
        fulfieldnames.append(ffn)
        t = input("Enter field type: ")
        fieldtype.append(t)
        u = input("Enter is field is unique (1/0): ")
        u = True if (u =='1') else False
        isunique.append(u)
        re = input("Enter field reference: ")
        ref.append(re)
        d = input("Enter field default value: ")
        default.append(d)
        r = input("Enter field required message: ")
        required.append(r)
    if(len(fieldnames)==0):
        fieldnames = ["field1","field2","field3"]
        fulfieldnames = []
        fieldtype = ["String","Number","mongoose.Schema.Types.ObjectId"]
        required = ["","","This 3 is required"]
        isunique = ["","","True"]
        default = ["","2",""]
        ref = ["","","users"]
    for i in range( len(fieldnames)):
        modelOut += '''
        %s : {
            type: %s,'''%(fieldnames[i], fieldtype[i])
        if(required[i]!=""):
            modelOut += '''
            required: '%s','''%(required[i])
        if(isunique[i]!=""):
            modelOut += '''
            unique: %s,'''%(isunique[i])
        if(default[i]!=""):
            modelOut += '''
            default: %s,'''%(default[i])
        if(ref[i]!=""):
            modelOut += '''
            ref: '%s','''%(ref[i])
        modelOut+='''
        },'''

        if(ref[i]!=""):
            conimports +='''import %s from "../models/%s.js";        
    '''%(ref[i],ref[i])
            confunc +='''
    // function to check if a foriegn key exists for (%s)
    async function get%s(res, %sID){
        let obj = await %s.findById(%sID);
        if(!obj){
            return res.status(404).json({
                status:"Failed",
                message:"%s not found."
            });
        }else{
            return 0;
        }
    }
    '''%(ref[i], ref[i].capitalize(),ref[i],ref[i],ref[i],ref[i].capitalize())
            

    modelOut += '''
    },{
        timestamps: true,
        versionKey:false,
        minimize: false
    });
    export default mongoose.model('%s', %sModel);
    '''%(tbname,tbname)


    # working on the function to create/ insert a enter on a api call 
    conCreateFunc = '''
    export async function create%s(req,res){
        try{
            const { %s } = req.body;
    '''%(tbname.capitalize(),", ".join(fieldnames))

    for i in range(0,len(fieldnames)):
        if(ref[i]!=""):
            conCreateFunc += '''
            is%sExists = await get%s(res, %s);
            if(is%sExists != 0){
                res = is%sExists;
                return res;
            }
    '''%(ref[i].capitalize(),ref[i].capitalize(),fieldnames[i],ref[i].capitalize(),ref[i].capitalize(),)
    conCreateFunc += '''
            // change this if you have one uniquw key in your table
            const existing%s = await %s.findOne({%s})

            if(existing%s){
                return res.status(400).json({
                    status:"Failed",
                    data:[],
                    message:"%s already exists."
                })
            }

            const new%s = new %s({
                %s
            });
            
            const saved%s = await new%s.save();
            const dataToSend = await %s.findById(saved%s._id).exec();
            
            res.status(200).json({
                status: "Success",
                data: dataToSend._doc,
                message: "%s created Successfully!"
            })
        }catch(e){
            res.status(500).json({
                status:"Failed",
                message:"Internal server error: "+ e
            })
        }
    }
    '''%(tbname.capitalize(), tbname, ", ".join(fieldnames) if isunique.count("true")==0 else fieldnames[isunique.index("true")], tbname.capitalize(), tbname.capitalize(), tbname.capitalize(), tbname, ",\n\t\t\t".join(fieldnames),tbname.capitalize(), tbname.capitalize(), tbname,tbname.capitalize(), tbname.capitalize())

    conUpdateFunc+='''
    // function to update %s a entry by id
    export async function update%s(req,res){
        try{
            const { _id, %s } = req.body;

            let existing%s = await %s.findById(_id);
            if(!existing%s){
                return res.status(404).json({
                    staus: "Failed",
                    message : "So such %s with id "+_id+" exists."
                });
            }

    '''%(tbname, tbname.capitalize(), ", ".join(fieldnames), tbname.capitalize(), tbname, tbname.capitalize(), tbname.capitalize())
    for i in range(0,len(fieldnames)):
        if(ref[i]!=""):
            conUpdateFunc += '''
            is%sExists = await get%s(res, %s);
            if(is%sExists != 0){
                res = is%sExists;
                return res;
            }
    '''%(ref[i].capitalize(),ref[i].capitalize(),fieldnames[i],ref[i].capitalize(),ref[i].capitalize(),)
    conUpdateFunc +='''
            dataToSend = await %s.findAndUpdateById(_id,{%s});
            return res.status(200).json({
                status: "Success",
                message: "%s with id "+_id+" updated successfully.",
                data: dataToSend._doc,
            });
        }catch(e){
            res.status(500).json({
                status:"Failed",
                message:"Internal server error: " + e
            });
        }
    }
    '''%(tbname, ", ".join(fieldnames), tbname.capitalize())

    # find function creation
    conFindFunc +='''
        export async function find%s(req,res){
        try{
            const { _id } = req.body;
            const existing%s = await %s.findById(_id);
            if(!existing%s){
                return res.status(401).json({
                    status:"Failed",
                    message:"%s with id "+_id+" doesn't exist"
                })
            }
            
            res.status(200).json({
                status:"Success",
                data: existing%s._doc,
                message: "Successful search!"
            })
        }catch(e){
            res.status(500).json({
                status:"Failed",
                message:"Internal server error: " + e
            });
        }
    }
    '''%(tbname.capitalize(),tbname.capitalize(),tbname, tbname.capitalize(), tbname.capitalize(), tbname.capitalize())

    #creatinf function which will list app objects
    conListFunc +='''
    // function to list whole %s data
    export async function list%s(req,res){
        try{
            const dataToSend = await %s.find().exec();
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
    '''%(tbname, tbname.capitalize(), tbname)

    #creating func to delete
    conDeleteFunc +='''
    export async function delete%s(req,res){
        try{
            const { _id } = req.body;
            let exist%s = await %s.findOne({ _id });
            if(!exist%s){
                return res.status(401).json({
                    status:"Failed",
                    message:"Can't find %s with ID: "+_id
                });
            }
            await %s.findOneAndDelete({ _id });
            res.status(200).json({
                status:"Success",
                message:"%s Deleted Successfully."
            })
        }catch(e){
            res.status(500).json({
                status:"Failed",
                message:"Internal server error: " + e
            });
        }
    }
    '''%(tbname.capitalize(), tbname.capitalize(), tbname, tbname.capitalize(), tbname.capitalize(), tbname, tbname.capitalize())
    modelf = os.path.join("models",tbname+".js")
    if not os.path.exists("models"):
        os.makedirs("models")
    with open(modelf, 'w') as file:
        file.write(modelOut)

    conOut += conimports
    conOut += confunc
    conOut += conCreateFunc
    conOut += conUpdateFunc
    conOut += conFindFunc
    conOut += conListFunc
    conOut += conDeleteFunc

    conf = os.path.join("controllers",tbname+"Con.js")
    if not os.path.exists("controllers"):
        os.makedirs("controllers")
    with open(conf, 'w') as file:
        file.write(conOut)

    routes='''
        server.post('/create%s',
            %s
            validate,
            create%s
        ),
        server.post('/update%s',
            %s
            validate,
            update%s
        ),
        server.post('/delete%s',
            check("_id").not().isEmpty().withMessage("%s ID is required.").trim(),
            validate,
            delete%s
        ),
        server.post('/find%s',
            check("_id").not().isEmpty().withMessage("%s ID is required.").trim(),
            validate,
            find%s
        ),
        server.post('/list%s',
            list%s
        ),

    '''%(tbname, ",\n\t".join(['check("'+i+'").not().isEmpty().withMessage("'+i+' is required.").trim(),' for i in fieldnames]), tbname.capitalize(), tbname,  ",\n\t".join(['check("'+i+'").not().isEmpty().withMessage("'+i+' is required.").trim(),' for i in fieldnames]), tbname.capitalize(), tbname, tbname.capitalize(), tbname.capitalize(),tbname, tbname.capitalize(), tbname.capitalize(),tbname, tbname.capitalize())
    routeImports = '''
    import { create%s, delete%s, find%s, list%s, update%s } from "../controllers/%sCon.js";
    '''%(tbname.capitalize(), tbname.capitalize(), tbname.capitalize(), tbname.capitalize(), tbname.capitalize(), tbname)

    print("Add this import to router file")
    print(routeImports)
    print("\nAdd this routes to router file")
    print(routes)
# mainvar = {
#     "tbname": {
#         "fieldnames": fieldnames,
#         "flutterfieldname": fulfieldnames,
#         "fieldtype": fieldtype,
#         "isunique": isunique,
#         "ref":ref,
#         "defaults":default,
#         "required": required
#     },
#     "tb2name": {
#         "fieldnames": fieldnames,
#         "flutterfieldname": fulfieldnames,
#         "fieldtype": fieldtype,
#         "isunique": isunique,
#         "ref":ref,
#         "defaults":default,
#         "required": required
#     },
# }