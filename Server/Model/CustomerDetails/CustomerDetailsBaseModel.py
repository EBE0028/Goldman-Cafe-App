from pydantic import BaseModel
class CustomerDetailsBaseModel(BaseModel):
    UserID: int
    UserName: str
    UserPhone: str
    UserEmail: str
    UserAddress: str
    UserLogin: str
    UserPassword: str   


class CustomerPasswordChangeModel(BaseModel):
    UserID: int
    UserPassword: str