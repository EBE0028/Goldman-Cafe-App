import json
import random
from fastapi import HTTPException
from Model.MenuItemModel import MenuItemModel
from Config.Configdb import MenuItem
import bson.json_util as json_util

def GetMenuItem():
    try:
        finalList = []
        for i in MenuItem.find():
            temp = MenuItemModel(i)
            finalList.append(temp)
        return { "MenuItems" : finalList}
    except:
        return HTTPException(status_code=500, detail = "Internal server error", headers= {"Content-Type": "application/json"})

def GetRandomMenuItemFromList():
    try:
        getLastMenuItem = MenuItem.find().limit(1).sort([('$natural', -1)]).next()
        totalNumberOfItems = getLastMenuItem["ItemID"]
        itemIDPicked = random.randint(1, totalNumberOfItems)
        if(itemIDPicked):
            menuItem = MenuItem.find_one({"ItemID": itemIDPicked})
            return MenuItemModel(menuItem)   
        else:
            return HTTPException(status_code=404, detail = "Can't able to fetch", headers= {"Content-Type": "application/json"})
    except:
            return HTTPException(status_code=500, detail = "Internal server error", headers= {"Content-Type": "application/json"})
  

    