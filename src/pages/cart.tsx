import Header from '../components/header';
import { ICartItem } from '../db/order';
import { useCart } from 'react-use-cart'
import { useDB } from '../context/db.context';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';


/* The above code defines a functional component called `CartItem` that takes in an `item` object of
type `ICartItem` as a parameter. It then uses the `useCart` and `useDB` hooks to access the cart
state and functions, and the database of drinks. It finds the drink object in the database that
matches the `productId` of the current `item` in the cart using the `findFirst` method. It then
renders a table row with information about the drink, including its name, image, price, and quantity
in the cart. It also provides buttons to update */
const CartItem = (item: ICartItem) => {
  /* `const cart = useCart()` is using the `useCart` hook from the `react-use-cart` library to access
  the cart state and functions. */
  const cart = useCart()

  const db = useDB()
  /* `const drink = db.drink.findFirst((drink) => drink.id === item.productId)` is finding the drink
  object in the `db` (database) that matches the `productId` of the current `item` in the cart. It is
  using the `findFirst` method to find the first object in the `db.drink` array that satisfies the
  condition specified in the callback function. The callback function checks if the `id` of the
  current `drink` object in the array matches the `productId` of the current `item` in the cart. The
  `drink` object is then assigned to the `drink` constant. */
  const drink = db.drink.findFirst((drink) => drink.id === item.productId)

  // console.log({ item, drink, drinks: db.drink.all() })
  return (
    <tr>
      <td className="column-sm-8 column-md-6">
        <div className="media">
          <a className="thumbnail pull-left" href=".">
            <img className="media-object" src={drink?.imageUrl} alt={String(drink?.id)} style={{ width: 72, height: 72 }} />
          </a>
          <div className="media-body">
            <h5 className="media-heading">{drink?.name}x  </h5>
            <span>Status: </span><span className="badge background__success"><strong>In Stock</strong></span>
          </div>
        </div>
      </td>
      <td className="column-sm-1 column-md-1" style={{ textAlign: 'center' }}>
        <input type="number" className="form-control" id="quantity" value={item.quantity} onChange={(e) => cart.updateItemQuantity(String(item.id), Number(e?.target?.value))} />
      </td>
      <td className="column-sm-1 column-md-1 text-center"><strong>£ {drink?.price ?? 0}</strong></td>
      <td className="column-sm-1 column-md-1 text-center"><strong>£ {cart.cartTotal}</strong></td>
      <td className="column-sm-1 column-md-1">
        <button type="button" onClick={() => cart.removeItem(String(item.id))} className="btn btn-danger">
          <span className="bi bi-trash"></span> Remove
        </button>
      </td>
    </tr>
  )
}

/* The above code is a React component called "Cart" that displays the items in the user's shopping
cart. It uses the "useCart" hook from the "react-use-cart" library to access the cart state and
functions. The component displays the cart items in a table, along with the subtotal, estimated
shipping, and total cost. It also includes a form for the user to enter their billing and payment
information, and a "Checkout" button that clears the cart and creates an order in the database with
the cart items. If there are no items in the cart, the component displays a message */
function Cart() {
  /* `const cart = useCart()` is using the `useCart` hook from the `react-use-cart` library to access
  the cart state and functions. */
  const cart = useCart();
  const db = useDB();
  const navigate = useNavigate();
  const cartItems = cart.items

  /**
   * The function clears the cart and creates an order in the database with the cart items.
   */
  const checkout = () => {
    cart.emptyCart();

    db.order.create(cartItems.map((item) => { return { id: Number(item.id), price: item.price, quantity: item.quantity, productId: item?.productId } as ICartItem }))

    navigate('/orders')

    alert('Order Completed Successfully')
  }
  return (
    <div>
      <Header />
      <div className="container-fluid my-3 px-5">
        {cartItems.length > 0 && <div className="row">
          <div className="column-sm-12 column-md-8">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Total</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((cartItem) => <CartItem id={Number(cartItem.id)} price={cartItem.price} productId={cartItem?.productId} quantity={cartItem.quantity ?? 1} key={cartItem.id} />)}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <h5>Subtotal</h5>
                    </td>
                    <td className="text-right">
                      <h5><strong>£ {cart.cartTotal}</strong></h5>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <h5>Estimated shipping</h5>
                    </td>
                    <td className="text-right">
                      <h5><strong>£ 10</strong></h5>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <h4>Total</h4>
                    </td>
                    <td className="text-right">
                      <h4><strong>£ {10 + cart.cartTotal}</strong></h4>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td colSpan={2} rowSpan={2}>
                      <a href="./drinks" className="btn btn-sm btn-main">
                        <span className="bi bi-shopping-cart"></span> Continue Shopping
                      </a>
                    </td>
                    {/* <td>
                      <button className="btn btn-sm btn-success">
                        Checkout <span className="bi bi-play"></span>
                      </button>
                    </td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="column-sm-12 column-md-4">
            <div id="checkout">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation">
                <div className="row">
                  <div className="column-md-6 mb-3">
                    <label htmlFor='firstName'>First name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="" required={true} />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="column-md-6 mb-3">
                    <label htmlFor='lastName'>Last name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" required={true} />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor='email'>Email <span className="text-muted">(Optional)</span></label>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor='address'>Address</label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" required={true} />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor='address2'>Delivery Address</label>
                  <input type="text" className="form-control" id="address2" placeholder="1234 Main St" />
                </div>
                <div className="row">
                  <div className="column-md-5 mb-3">
                    <label htmlFor='country'>Country</label>
                    <select className="form-select display-block w-100" id="country" required={true}>
                      <option>Choose...</option>
                      <option>United States</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="column-md-4 mb-3">
                    <label htmlFor='state'>State</label>
                    <select className="form-select display-block w-100" id="state" required={true}>
                      <option>Choose...</option>
                      <option>California</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>
                  <div className="column-md-3 mb-3">
                    <label htmlFor='zip'>Zip</label>
                    <input type="text" className="form-control" id="zip" placeholder="" required={true} />
                    <div className="invalid-feedback">
                      Zip code required.
                    </div>
                  </div>
                </div>
                <hr className="mb-4"></hr>
                <h4 className="mb-3">Payment</h4>
                <div className="display-block my-3">
                  <div className="custom-control custom-radio">
                    <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" defaultChecked={true} required={true} />
                    <label htmlFor='credit' className="custom-control-label">Credit card</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required={true} />
                    <label htmlFor='debit' className="custom-control-label">Debit card</label>
                  </div>
                </div>
                <div className="row">
                  <div className="column-md-6 mb-3">
                    <label htmlFor='cc-name'>Name on card</label>
                    <input type="text" className="form-control" id="cc-name" placeholder="" required={true} />
                    <small className="text-muted">Full name as display-ed on card</small>
                    <div className="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div className="column-md-6 mb-3">
                    <label htmlFor='cc-number'>Credit card number</label>
                    <input type="text" className="form-control" id="cc-number" placeholder="" required={true} />
                    <div className="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="column-md-6 mb-3">
                    <label htmlFor='cc-expiration'>Expiration</label>
                    <input type="text" className="form-control" id="cc-expiration" placeholder="" required={true} />
                    <div className="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
                  <div className="column-md-6 mb-3">
                    <label htmlFor='cc-cvv'>CVV</label>
                    <input type="text" className="form-control" id="cc-cvv" placeholder="" required={true} />
                    <div className="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
                <hr className="mb-4"></hr>
                <button onClick={() => checkout()} className="btn btn-main btn-lg btn-block" type="button">Checkout</button>
              </form>
            </div>
          </div>
        </div>}
        {cartItems.length <= 0 && <>
          <center>
            <h2>No Item In Cart</h2>
            <a className='btn btn-main' href='/drinks'>Buy Drinks Now</a>
          </center>
        </>}
      </div>
      <Footer />
    </div>
  )
}

export default Cart;
