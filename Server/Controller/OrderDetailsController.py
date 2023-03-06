from fastapi import HTTPException
from Config.Configdb import CustomerDetailsCollection, OrdersTable
from Model.OrderDetails.OrderDetailsModel import OrderDetailsModel

def GetOrderDetails(userID):
    try:
        finalList=[]
        for i in OrdersTable.find({"UserID": int(userID)}):
            temp = OrderDetailsModel(i)
            finalList.append(temp)
        if(finalList):
            return finalList
        else:
            return HTTPException(status_code=404, detail = "No orders", headers= {"Content-Type": "application/json"})
    except:
            return HTTPException(status_code=500, detail = "Internal server error", headers= {"Content-Type": "application/json"})

def AddOrderDetails(orderDetails):
    try:        
        findAccount = CustomerDetailsCollection.find_one({"UserID" : orderDetails.UserID})
        if(findAccount):
            OrdersTable.insert_one(dict(orderDetails))
            return HTTPException(status_code=200, detail = "Your order has been placed successfully.", headers= {"Content-Type": "application/json"}) 
        else:
            return HTTPException(status_code=404, detail = "You are not our registered user. ! please login !", headers= {"Content-Type": "application/json"})
    except:
        return HTTPException(status_code=500, detail = "Something went wrong ! its not you its us . Please try again", headers= {"Content-Type": "application/json"})

def GetTotalAmountOfOrder(userID):  
    try:
        getLastOrder = OrdersTable.find({"UserID" : int(userID)}).limit(1).sort([('$natural', -1)]).next()
        print(getLastOrder["OrderID"])
        return HTTPException(status_code=200, detail =  int(getLastOrder["OrderID"]), headers= {"Content-Type": "application/json"}) 
    except:
        return HTTPException(status_code=200, detail = "0", headers= {"Content-Type": "application/json"}) 
    