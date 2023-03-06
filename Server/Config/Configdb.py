from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
GoldmanCafeDB = client["GoldmanCafe"]
CustomerDetailsCollection = GoldmanCafeDB["CustomerDetails"]
OrdersTable = GoldmanCafeDB["OrdersTable"]
MenuItem = GoldmanCafeDB["MenuItem"]