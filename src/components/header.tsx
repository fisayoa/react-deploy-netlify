/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart'
import { useDB } from '../context/db.context';

function Header() {
  /* These lines of code are importing the `useCart` and `useDB` hooks from their respective contexts
  and using them to retrieve the total number of unique items in the cart and the total cost of the
  items in the cart. These values are then used in the header component to display the number of
  items in the cart and the total cost. */
  const cart = useCart();
  const db = useDB();
  const totalUniqueItems = cart.totalUniqueItems;
  const cartTotal = cart.cartTotal;

  return (
    <header className="section-header">
      <nav className="navbar navbar-dark navbar-expand padding__0 btn-main">
        <div className="container-fluid">
          <ul className="navbar-nav display-none display-md-flex mr-auto">
            <li className="nav-item"><Link className='nav-link' to="/">Home</Link></li>
            <li className="nav-item"><Link className='nav-link' to="/drinks">Drinks</Link></li>
            <li className="nav-item"><Link className='nav-link' to="/cart">Cart ({totalUniqueItems})</Link></li>
            <li className="nav-item"><Link className='nav-link' to="/register">Register</Link></li>
            <li className="nav-item"><Link className='nav-link' to="/orders">Orders ({db.order.findAll().length})</Link></li>
          </ul>
          <ul className="navbar-nav display-flex align-items-center">
            <div className="dropdown">
              <a className="nav-link display-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <li className="nav-item">
                  <div className="display-flex flex-row">
                    <img alt='logo' src="https://i.imgur.com/EYFtR83.jpg" className="rounded-circle" width="30" />
                  </div>
                </li>
                <li className="nav-item">
                  <span>Fisayo</span>
                  <i className='ps-1 bi bi-chevron-down'></i>
                </li>
              </a>
              <ul className="dropdown-menu">
                <div className="display-block display-lg-none display-md-none">
                  <li><a className="dropdown-item" href="./">Home</a></li>
                  <li><a className="dropdown-item" href="./drinks">Drinks</a></li>
                  <li><a className="dropdown-item" href="./cart">Cart</a></li>
                  <li><a className="dropdown-item" href="./register">Register</a></li>
                  <li><a className="dropdown-item" href="./orders">Orders</a></li>
                </div>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li><a className="dropdown-item text-danger" href="./login">Logout</a></li>
              </ul>
            </div>
          </ul>
        </div>
      </nav>

      <section className="header-main border-bottom background__white">
        <div className="container-fluid">
          <div className="row padding__2 pt-3 pb-3 display-flex align-items-center">
            <div className="column-md-2">
              <a href="./" className="h2 text-decoration-none display-none display-md-flex text-main">FINE WINE</a>
            </div>
            <form method='GET' className="column-md-8">
              <div className="input-group">
                <input type="search" name="search" id="search" placeholder="Search for product" className="form-control" />
                <button type="submit" className="btn btn-main"><i className="bi bi-search"></i></button>
              </div>
            </form>

            <div className="column-md-2">
              <a href="./cart" className="text-decoration-none text-dark display-flex display-none display-md-flex flex-row align-items-center">
                <span className="btn-main text-light cart display-flex align-items-center justify-content-center fs-4 rounded-circle square-42"><i className="bi bi-cart"></i></span>
                <div className="display-flex flex-column ms-2">
                  <span>{totalUniqueItems} Product</span>
                  <span className="fw-bold">£{cartTotal}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </header>
  )
}

export default Header;
