import React from 'react'
import Header from '../components/header'
import { useDB } from '../context/db.context'
import { IOrder } from '../db/order'
import Footer from '../components/footer';

export interface IOrderPageArr {
  id: number;
  itemId: number;
  itemPrice: number;
  itemQuantity: number;
  productId: number;
}

const OrderItem = (item: IOrderPageArr) => {
  /* `const db = useDB()` is using the `useDB` hook from the `db.context` to get access to the database. */
  const db = useDB();

  const drink = db.drink.findFirst((drink) => drink.id === item.productId)
  return (
    <tr className="cell-1">
      <td>#FW-{item.id}</td>
      <td>{item.itemQuantity} {drink?.name}s</td>
      <td><span className="badge bg-success">Fullfilled</span></td>
      <td>${item.itemPrice}</td>
      <td>Today</td>
    </tr>
  )
}
export default function Orders() {
  /* `const db = useDB()` is using the `useDB` hook from the `db.context` to get access to the database. */
  const db = useDB();

  /**
   * The function transforms an array of orders into an array of order items with additional data.
   * @param {IOrder[]} orders - an array of objects of type IOrder, which contains information about an
   * order, including its id, items, and total price.
   * @returns The function `transformItems` is returning an array of objects of type `IOrderPageArr`.
   * Each object in the array represents an item in an order and contains the following properties:
   * `id` (order ID), `itemId` (product ID), `itemPrice` (price of the product), `itemQuantity`
   * (quantity of the product), and `productId` (product ID).
   */
  const transformItems = (orders: IOrder[]) => {
    const transformedOrders: IOrderPageArr[] = [];

    orders.forEach(order => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, items, totalPrice } = order;

      items.forEach(item => {
        const { price: itemPrice, quantity: itemQuantity, productId } = item;
        const data = {
          id,
          itemId: item.productId,
          itemPrice,
          itemQuantity,
          productId
        }
        transformedOrders.push(data);
      });
    });

    return transformedOrders;
  };

  /* `const orders = transformItems(db.order.findAll());` is calling the `transformItems` function and
  passing in the result of `db.order.findAll()` as an argument. The `transformItems` function takes
  an array of orders and transforms it into an array of order items with additional data. The
  resulting array is then assigned to the `orders` constant, which is used to render the order items
  in the table. */
  const orders = transformItems(db.order.findAll());


  return (
    <div className='w-100'>
      <Header />
      <div className="container-fluid w-100 vh-100 mt-5">
        <div className="display-flex w-100 justify-content-center row">
          <div className="column-md-12">
            <div className="rounded w-100">
              {orders.length > 0 && <div className="table-responsive w-100">
                <table className="table table-striped w-100 table-hover">
                  <thead className="background__main">
                    <th>Order #</th>
                    <th>Drink Name</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Date Ordered</th>
                  </thead>
                  <tbody className="table-body">
                    {orders.map((order) => <OrderItem {...order} />)}
                  </tbody>
                </table>
              </div>}
              {orders.length <= 0 && <>
                <center>
                  <h2>No Orders History</h2>
                  <a className='btn btn-main' href='/drinks'>Buy Drinks Now</a>
                </center>
              </>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
