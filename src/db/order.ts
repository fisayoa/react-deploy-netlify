import { randomID } from "./repository";

/* `export interface ICartItem` is defining an interface for a cart item, which has four properties:
`id` (a number), `price` (a number), `productId` (a number), and `quantity` (a number). This
interface can be used to define the structure of objects that represent cart items in the code. */
export interface ICartItem {
    id: number;
    price: number;
    productId: number;
    quantity: number;
}

/* `export interface IOrderItem` is defining an interface for an order item, which has three
properties: `productId` (a number), `quantity` (a number), and `price` (a number). This interface
can be used to define the structure of objects that represent order items in the code. */
export interface IOrderItem {
    productId: number;
    quantity: number;
    price: number;
}

/* `export interface ICart` is defining an interface for a shopping cart, which has three properties:
`id` (a number), `userId` (a number), and `items` (an array of `ICartItem` objects). This interface
can be used to define the structure of objects that represent shopping carts in the code. */
export interface ICart {
    id: number;
    userId: number;
    items: ICartItem[];
}

/* `export interface IOrder` is defining an interface for an order, which has three properties: `id` (a
number), `items` (an array of `IOrderItem` objects), and `totalPrice` (a number). This interface can
be used to define the structure of objects that represent orders in the code. The `id` property is a
unique identifier for the order, the `items` property is an array of order items, and the
`totalPrice` property is the total price of the order, calculated by summing the prices of all the
order items. */
export interface IOrder {
    id: number;
    items: IOrderItem[];
    totalPrice: number;
}


/* `export interface IOrderRepository` is defining an interface for an order repository, which
specifies the methods that can be used to interact with the repository. The methods include creating
a new order, updating an existing order, finding an order by its ID, retrieving all orders, removing
an order, adding an order item to an existing order, updating an order item's quantity, and removing
an order item from an existing order. The methods take in various parameters and return either an
`IOrder` object or `null`/`boolean` depending on the method. This interface can be used to ensure
that any implementation of an order repository adheres to the specified methods and their expected
input/output. */
export interface IOrderRepository {
    create(order: ICartItem[]): IOrder;
    update(id: number, order: IOrder): IOrder | null;
    find(id: number): IOrder | null;
    findAll(): IOrder[];
    remove(id: number): boolean;
    addOrderItem(orderId: number, item: IOrderItem): IOrder | null;
    updateOrderItem(orderId: number, itemId: number, quantity: number): IOrder | null;
    removeOrderItem(orderId: number, itemId: number): IOrder | null;
}

/* The OrderRepository class implements the IOrderRepository interface and provides methods for
creating, updating, finding, and removing orders, as well as adding, updating, and removing order
items. */
export class OrderRepository implements IOrderRepository {
    /* `private orders: IOrder[] = [];` is declaring a private property `orders` of type `IOrder` array and
    initializing it to an empty array. This property is used to store all the orders in the order
    repository. The `private` keyword makes the property accessible only within the `OrderRepository`
    class and not from outside the class. */
    private orders: IOrder[] = [];

    /**
     * The function creates a new order with a unique ID, copies the items from the cart, calculates
     * the total price, adds the order to the list of orders, and returns the new order.
     * @param {ICartItem[]} order - An array of objects representing the items in the order. Each
     * object should have the following properties:
     * @returns The `create` function is returning a new order object of type `IOrder`.
     */
    create(order: ICartItem[]): IOrder {
        const newOrder: IOrder = {
            id: randomID(),
            items: order.map(item => ({ ...item })),
            totalPrice: 0,
        };
        // Calculate total price for the order
        newOrder.totalPrice = newOrder.items.reduce((total: number, item: { price: number; quantity: number; }) => total + item.price * item.quantity, 0);
        this.orders.push(newOrder);
        return newOrder;
    }


    /**
     * This function updates an existing order in an array of orders based on the provided ID and
     * returns the updated order or null if the order does not exist.
     * @param {number} id - A number representing the unique identifier of the order to be updated.
     * @param {IOrder} order - IOrder is an interface or type that defines the structure of an order
     * object. It likely includes properties such as id, customer name, order date, items ordered,
     * total cost, etc. The `order` parameter in the `update` method is an instance of this interface
     * that represents the updated order
     * @returns The `update` method returns either the updated `IOrder` object if the order with the
     * specified `id` exists in the `orders` array, or `null` if the order does not exist.
   */
    update(id: number, order: IOrder): IOrder | null {
        const existingOrder = this.find(id);
        if (existingOrder) {
            const index = this.orders.findIndex(o => o.id === id);
            this.orders[index] = order;
            return order;
        }
        return null;
    }

    /**
    * This function finds an order by its ID and returns it, or returns null if it is not found.
    * @param {number} id - The `id` parameter is a number that represents the unique identifier of an
    * order. The `find` method searches through an array of orders (`this.orders`) and returns the
    * order object that matches the given `id`. If no order is found, it returns `null`.
    * @returns The `find` method is being used to search for an order in the `orders` array based on
    * the `id` parameter passed to the function. If an order with the specified `id` is found, it is
    * returned. If not, `null` is returned. Therefore, the function returns either an `IOrder` object
    * or `null`.
    */
    find(id: number): IOrder | null {
        return this.orders.find(o => o.id === id) || null;
    }

    /**
     * The function returns an array of orders.
     * @returns An array of IOrder objects is being returned by the `findAll()` method.
     */
    findAll(): IOrder[] {
        return this.orders;
    }

    /**
     * This function removes an order from an array of orders based on its ID and returns a boolean
     * indicating whether the removal was successful or not.
     * @param {number} id - number - the unique identifier of the order to be removed from the orders
     * array.
     * @returns A boolean value is being returned. If the order with the specified ID is found and
     * removed, the method returns `true`. Otherwise, it returns `false`.
     */
    remove(id: number): boolean {
        const index = this.orders.findIndex(o => o.id === id);
        if (index !== -1) {
            this.orders.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * This function adds an item to an order and updates the total price of the order.
     * @param {number} orderId - a number representing the ID of the order to which the item will be
     * added.
     * @param {IOrderItem} item - IOrderItem is an interface that defines the properties of an item
     * that can be added to an order. It typically includes properties such as name, price, quantity,
     * and any other relevant information about the item. In the context of this function, the `item`
     * parameter represents the item that is being
     * @returns an object of type `IOrder` if the order is found and the item is added successfully,
     * otherwise it returns `null`.
     */
    addOrderItem(orderId: number, item: IOrderItem): IOrder | null {
        const order = this.find(orderId);
        if (order) {
            order.items.push(item);
            // Update total price for the order
            order.totalPrice += item.price * item.quantity;
            return order;
        }
        return null;
    }

    /**
     * This function updates the quantity of an item in an order and recalculates the total price of
     * the order.
     * @param {number} orderId - The ID of the order that needs to be updated.
     * @param {number} itemId - The ID of the item that needs to be updated in the order.
     * @param {number} quantity - The new quantity of the order item that needs to be updated.
     * @returns an object of type `IOrder` if the order is found and the order item is updated
     * successfully, otherwise it returns `null`.
     */
    updateOrderItem(orderId: number, itemId: number, quantity: number): IOrder | null {
        const order = this.find(orderId);
        if (order) {
            const orderItem = order.items.find((item: { productId: number; }) => item.productId === itemId);
            if (orderItem) {
                const priceDifference = (quantity - orderItem.quantity) * orderItem.price;
                orderItem.quantity = quantity;
                // Update total price for the order
                order.totalPrice += priceDifference;
                return order;
            }
        }
        return null;
    }

    /**
     * This function removes an item from an order and updates the total price of the order.
     * @param {number} orderId - a number representing the ID of the order from which an item needs to
     * be removed.
     * @param {number} itemId - The ID of the item that needs to be removed from the order.
     * @returns an object of type `IOrder` if an order with the given `orderId` is found and an item
     * with the given `itemId` is successfully removed from the order. If the order or item is not
     * found, the function returns `null`.
     */
    removeOrderItem(orderId: number, itemId: number): IOrder | null {
        const order = this.find(orderId);
        if (order) {
            const index = order.items.findIndex((item: { productId: number; }) => item.productId === itemId);
            if (index !== -1) {
                const removedItem = order.items.splice(index, 1)[0];
                // Update total price for the order
                order.totalPrice -= removedItem.price * removedItem.quantity;
                return order;
            }
        }
        return null;
    }
}
