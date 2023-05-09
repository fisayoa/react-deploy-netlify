function Jumbotron() {
  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://www.drinksonline.store/wp-content/uploads/2022/04/Drinks-header-baner-scaled.jpg" className="display-block w-100" alt="..." />
          <div className="carousel-caption display-none display-md-block">
            <h4>A Special Drink for a special customer.</h4>
            <a href="./drinks" className="btn-main btn">Order Now</a>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default Jumbotron;
