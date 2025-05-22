from pymongo import MongoClient
import csv
from collections import defaultdict

def flatten(doc, parent_key='', sep='.'):
    items = []
    for k, v in doc.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten(v, new_key, sep=sep).items())
        else:
            items.append((new_key, type(v).__name__))
    return dict(items)

client = MongoClient('mongodb://localhost:27017')
db = client['userauth']  # <-- Change this

result = []

for coll_name in db.list_collection_names():
    sample = db[coll_name].find_one()
    if sample:
        flat = flatten(sample)
        for field, ftype in flat.items():
            result.append({
                'collection_name': coll_name,
                'field_name': field,
                'field_type': ftype
            })

with open('schema_export.csv', 'w', newline='') as csvfile:
    fieldnames = ['collection_name', 'field_name', 'field_type']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for row in result:
        writer.writerow(row)

print("Exported to schema_export.csv")
