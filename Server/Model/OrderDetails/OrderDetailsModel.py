
def OrderDetailsModel(item):
    return {
            "UserID": int(item["UserID"]),
            "OrderID": int(item["OrderID"]),
            "OrderItems": list(item["OrderItems"]),
            "OrderQuantity": list(item["OrderQuantity"]),
            "OrderCost": list(item["OrderCost"]),
            "Date": str(item["Date"])
    }