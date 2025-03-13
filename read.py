import pandas as pd

# Load the Excel file
def readExcel(file_path, isFlutter):
    df = pd.read_excel(file_path, sheet_name=1)

    mainvar = {}
    dbi = 0
    dbname = df["dbname"][0]
    typeList = []
    fnameList = []
    uniqueList = []
    defaultList = []
    refList = []
    reqList = []
    flutterFieldList = []
    for i in range(len(df)):
        if(pd.notna(df["dbname"][i]) and df["dbname"][i]!=''):
            # var = {}
            # var[df["dbname"][dbi]]
            mainvar[dbname]= {
                "fieldnames": fnameList,
                "flutterfieldname": flutterFieldList,
                "fieldtype":typeList,
                "isunique": uniqueList,
                "ref":refList,
                "defaults":defaultList,
                "required": reqList
            }
            print(f"database {dbi}: {df["dbname"][i]}")
            dbname = df["dbname"][i]
            mainvar[dbname] = {}
            fnameList = []
            typeList = []
            uniqueList = []
            defaultList = []
            refList = []
            reqList = []
            flutterFieldList = []
            dbi = i
        fn = "" if (not pd.notna(df["fieldname"][i]) or df["fieldname"][i].strip() =="-") else df["fieldname"][i]
        ty = "" if (not pd.notna(df["type"][i]) or df["type"][i].strip() =="-") else df["type"][i]
        un = "" if (not pd.notna(df["unique"][i]) or str(df["unique"][i]).strip() =="-") else str(df["unique"][i]).lower()
        de = "" if (not pd.notna(df["default"][i]) or df["default"][i].strip() =="-") else df["default"][i]
        rf = "" if (not pd.notna(df["ref"][i]) or df["ref"][i].strip() =="-") else df["ref"][i]
        rq = "" if (not pd.notna(df["required"][i]) or str(df["required"][i]).strip() =="-") else str(df["required"][i]).lower()
        flf = df["flutterFields"] if isFlutter else fn
        fnameList.append(fn.strip())
        typeList.append(ty.strip())
        uniqueList.append(un.strip())
        defaultList.append(de.strip())
        refList.append(rf.strip())
        reqList.append(rq.strip())
        flutterFieldList.append(flf.strip())
    else:
        mainvar[dbname]= {
            "fieldnames": fnameList,
            "flutterfieldname": flutterFieldList,
            "fieldtype":typeList,
            "isunique": uniqueList,
            "ref":refList,
            "defaults":defaultList,
            "required": reqList
        }
        print(f"database {dbi}: {df["dbname"][i]}")
        dbname = df["dbname"][i]
        fnameList = []
        typeList = []
        uniqueList = []
        defaultList = []
        refList = []
        reqList = []
        flutterFieldList = []
        dbi = i

    print("\n\n\n------------------------\n\n")
    for i, j in mainvar.items():
        print(i,": ", end="{\n")
        for k, l in j.items():
            print("\t",k,": ",l)
        print("}\n")
    return mainvar