import { IDrinks } from '../db/drinks'
import { useCart } from 'react-use-cart'

const DrinkCard = (drink: IDrinks) => {
    /* `const cart = useCart();` is using the `useCart` hook from the `react-use-cart` library to
    create a `cart` object that can be used to manage the items in the user's shopping cart. The
    `cart` object has methods like `addItem`, `updateItemQuantity`, and `removeItem` that can be
    used to add, update, or remove items from the cart. The `addToCart` function is using the
    `addItem` method to add the current drink to the cart when the "ADD TO CART" button is clicked. */
    const cart = useCart();
    const addToCart = () => cart.addItem({ id: String(drink.id), price: drink.price, productId: drink.id, quantity: 1 })
    
    return (
        <div className="mx-auto column-lg-3 column-md-4 column-sm-6 column-10 mt-5">
            <img className='mx-auto img-thumbnail' width="100%" height="auto" alt={String(drink.id)} src={drink.imageUrl} />
            <div className="border border-light text-center mx-auto">
                <div className=''>
                    <h6 className="text-truncate">{drink.name}</h6>
                    <h5 className="badge bg-white text-main my-1 py-2">£ {drink.price}</h5>
                    <div className="display-flex my-2 align-items-center justify-content-evenly">
                        <button onClick={() => addToCart()} className="btn btn-main px-auto">ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DrinkCard