import uvicorn
from Controller.CustomerDetailsController import CustomerPasswordChanged, GetCustomerDetails,AddNewCustomerDetails, GetTotalCustomer
from Controller.OrderDetailsController import GetOrderDetails,AddOrderDetails,GetTotalAmountOfOrder
from Model.CustomerDetails.CustomerDetailsBaseModel import CustomerDetailsBaseModel, CustomerPasswordChangeModel
from Model.OrderDetails.OrderDetailsBaseModel import OrderDetailsBaseModel
from Controller.MenuItemController import GetMenuItem, GetRandomMenuItemFromList
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/GetUserProfile/{userID}")
async def GetCustomerDetail(userID : int):  
    return GetCustomerDetails(userID)
        
@app.post("/AddUserProfile/")
async def AddNewCustomerDetail(customerDetailsBaseModel : CustomerDetailsBaseModel): 
       return AddNewCustomerDetails(customerDetailsBaseModel) 


@app.get("/GetOrderID/{userID}")
async def GetOrderDetail(userID):   
    return GetOrderDetails(userID)

@app.post("/AddNewOrder/")
async def AddNewOrder(orderDetails : OrderDetailsBaseModel):
    return AddOrderDetails(orderDetails)


@app.get("/GetMenuItems")
async def GetMenuItems():
    return GetMenuItem()

@app.get("/GetTotalNumberOfOrders/{userID}")
async def GetTotalNumberOfOrders(userID):
    return GetTotalAmountOfOrder(userID)

@app.get("/GetTotalNumberOfCustomer/")
async def GetTotalNumberOfCustomers():
    return GetTotalCustomer()   

@app.get("/GetRandomMenuItem/")
async def GetRandomMenuItem():
    return GetRandomMenuItemFromList()

@app.post("/ChangePasswordCustomer/")
async def ChangePasswordCustomer(customerPasswordChange : CustomerPasswordChangeModel):
    return CustomerPasswordChanged(customerPasswordChange)


 # at last, the bottom of the file/module
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)