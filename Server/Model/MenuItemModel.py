
def MenuItemModel(item):
    return {       
        "Name": str(item["Name"]),
        "Cost": int(item["Cost"]),
        "Image": str(item["Image"]),
        "ItemID": int(item["ItemID"]),
        "Category": str(item["Category"]),
        "Description": str(item["Description"]),
    }