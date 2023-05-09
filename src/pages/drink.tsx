import React from 'react'
import Header from '../components/header';
import JumbotronSmall from '../components/jumbotronSmall';

function Drink() {
  return (
    <div>
      <Header />
      <JumbotronSmall />
      <div className="container-fluid my-5">
        <div className="row">
          <div className="column-md-6">
            <div className="display-flex align-items-center justify-content-center">
              <img className="img-fluid" src="https://via.placeholder.com/550x380/FFB6C1/000000" alt="" />
            </div>
            <div className="display-flex align-items-center justify-content-evenly my-2">
              <span>
                <img className="img-fluid" src="https://via.placeholder.com/115x100/87CEFA/000000" alt="" />
              </span>
              <span>
                <img className="img-fluid" src="https://via.placeholder.com/115x100/FF7F50/000000" alt="" />
              </span>
              <span>
                <img className="img-fluid" src="https://via.placeholder.com/115x100/20B2AA/000000" alt="" />
              </span>
              <span>
                <img className="img-fluid" src="https://via.placeholder.com/120x100/20B2AA/000000" alt="" />
              </span>
            </div>
          </div>
          <div className="column-md-6">
            <h4 className="h2">Leopard Shirt Dress </h4>
            <p>
              Praesent ac condimentum felis. Nulla at nisl orci, at dignissim dolor, The best product descriptions address your ideal buyer directly and personally. The best product descriptions address your ideal buyer directly and personally.
            </p>
            <div className="padding__meta">
              <span className="posted_in">
                <strong>Categories:</strong>
                <a rel="tag" href=".">Wine</a>, <a rel="tag" href=".">Alcohol</a>
              </span>
            </div>
            <div id="price">
              <strong>Price : </strong>
              <span className="pro-price"> £300.00</span>
            </div>
            <div className="display-flex align-items-center">
              <label>Quantity : </label>
              <input type="quantiy" placeholder="1" className="form-control form-control-sm w-25 my-3 quantity" />
            </div>
            <p>
              <button className="btn btn-round btn-main" type="button">
                <i className="pb-1 bi bi-cart"></i>
                Add to Cart
              </button>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Drink;
