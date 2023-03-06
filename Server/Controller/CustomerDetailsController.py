from fastapi import HTTPException
from Config.Configdb import CustomerDetailsCollection
from Model.CustomerDetails.CustomerDetailsModel import CustomerDetailsModel


def GetCustomerDetails(userID):
    try: 
        if(CheckIfCustomerIsValid(userID)):
            result = CustomerDetailsCollection.find_one({"UserID" : userID})
            return CustomerDetailsModel(result)
        else:
            return HTTPException(status_code=404, detail = "User not found", headers= {"Content-Type": "application/json"})
    except:
                return HTTPException(status_code=500, detail = "Internal server error", headers= {"Content-Type": "application/json"})

def AddNewCustomerDetails(item):
    try:      
            CustomerDetailsCollection.insert_one(dict(item))
            return HTTPException(status_code=200, detail = "Customer added successfully", headers= {"Content-Type": "application/json"})
    except:
        return HTTPException(status_code=500, detail = "Internal server error", headers= {"Content-Type": "application/json"})

def GetTotalCustomer():
    try:
        getLastCustomerID = CustomerDetailsCollection.find().limit(1).sort([('$natural', -1)]).next()
        return HTTPException(status_code=200, detail = int(getLastCustomerID["UserID"]), headers= {"Content-Type": "application/json"}) 
    except:
        return HTTPException(status_code=200, detail = 0, headers= {"Content-Type": "application/json"}) 

def CustomerPasswordChanged(customerdetails):
        if(CheckIfCustomerIsValid(customerdetails.UserID)):
            query = { "UserID": customerdetails.UserID}
            newValue = { "$set": { "UserPassword": customerdetails.UserPassword} }
            result= CustomerDetailsCollection.update_one(query, newValue)
            return HTTPException(status_code=200, detail = "Password changed successfully", headers= {"Content-Type": "application/json"})
        else:
            return HTTPException(status_code=404, detail = "User not found", headers= {"Content-Type": "application/json"})

def CheckIfCustomerIsValid(userID):
    result = CustomerDetailsCollection.find_one({"UserID" : userID})
    if(result):
        return 1
    else:
        return 0 