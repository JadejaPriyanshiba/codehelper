from main import makeSchema


mainvar = {
    "user": {
        "fieldnames": ["name","email","contact", "desc"],
        "flutterfieldname": ["name","email","contact", "desc"],
        "fieldtype": ["String","String","Number","String"],
        "isunique": ["","true","true",""],
        "ref":["","","",""],
        "defaults":["","","","default describtion"],
        "required": ["name is required","email is required","",""]
    },
    "car": {
        "fieldnames": ["model","companyID","OwnerID","number_plate"],
        "flutterfieldname": ["model","companyID","OwnerID","number_plate"],
        "fieldtype": ["String","mongoose.Schema.Types.ObjectId","mongoose.Schema.Types.ObjectId","Number"],
        "isunique": ["","","",""],
        "ref":["","cars","user",""],
        "defaults":["","","",""],
        "required": ["Model name is required","","","Number plate us required"]
    },
}

for key, value in mainvar.items():
#     (function) def makeSchema(
#     tbname: Any,
#     fieldnames: Any,
#     fieldtype: Any,
#     isunique: Any,
#     required: Any,
#     default: Any,
#     ref: Any,
#     fulfieldnames: Any
# ) ->
    makeSchema(
        key,
        False, 
        value["fieldnames"],
        value["fieldtype"], 
        value["isunique"],
        value["required"],
        value["defaults"],
        value["ref"],
        value["flutterfieldname"]
    )
