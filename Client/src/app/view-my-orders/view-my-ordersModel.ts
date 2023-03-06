export class ViewOrdersHistory {
    UserID: number;
    OrderID: number;
    OrderItems: string[];
    OrderQuantity: number[];
    OrderCost: number[];
    Date: string;
    status_code!: number;

    constructor(
        userID: number,
        orderID: number,
        orderItems: string[],
        orderQuantity: number[],
        orderCost: number[],
        date: string
      ) {
        this.UserID = userID;
        this.OrderID = orderID;
        this.OrderItems = orderItems;
        this.OrderQuantity = orderQuantity;
        this.OrderCost = orderCost;
        this.Date = date;
      }

  }