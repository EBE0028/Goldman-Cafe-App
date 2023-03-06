
def CustomerDetailsModel(item):
    return  {
        "UserID": str(item["UserID"]),
        "UserName": str(item["UserName"]),
        "UserPhone": str(item["UserPhone"]),
        "UserEmail": str(item["UserEmail"]),
        "UserAddress": str(item["UserAddress"]),
        "UserLogin": str(item["UserLogin"]),
        "UserPassword": str(item["UserPassword"]),
    }