from pydantic import BaseModel
class OrderDetailsBaseModel(BaseModel):
    UserID: int
    OrderID: int
    OrderItems: list
    OrderQuantity: list
    OrderCost: list
    Date: str

