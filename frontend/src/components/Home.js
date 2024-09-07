import { Fragment } from "react";

export default function Home() {
    return (
        <Fragment>
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                        <div className="card p-3 rounded">
                            <img
                                src="./images/products/1.jpg"
                                className="card-img-top mx-auto"
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    <a href="">
                                        OPPO F21s Pro 5G (Dawnlight Gold, 8GB
                                        RAM, 128GB Storage)
                                    </a>
                                </h5>
                                <div className="ratings mt-auto">
                                    <div className="rating-outer">
                                        <div className="rating-inner"></div>
                                    </div>
                                    <span id="no_of_reviews">(5 Reviews)</span>
                                </div>
                                <p className="card-text">22500</p>
                                <a
                                    href="#"
                                    id="view_btn"
                                    className="btn btn-block"
                                >
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                        <div className="card p-3 rounded">
                            <img
                                src="./images/products/2.jpg"
                                className="card-img-top mx-auto"
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    <a href="">
                                        WRISTIO HD, Bluetooth Calling Smart
                                        Watch
                                    </a>
                                </h5>
                                <div className="ratings mt-auto">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-o"></i>
                                    <i className="fa fa-star-o"></i>
                                    <span id="no_of_reviews">(5 Reviews)</span>
                                </div>
                                <p className="card-text">6500</p>
                                <a
                                    href="#"
                                    id="view_btn"
                                    className="btn btn-block"
                                >
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                        <div className="card p-3 rounded">
                            <img
                                src="./images/products/3.jpg"
                                className="card-img-top mx-auto"
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    <a href="">Dell Inspiron 3511 Laptop</a>
                                </h5>
                                <div className="ratings mt-auto">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-o"></i>
                                    <i className="fa fa-star-o"></i>
                                    <span id="no_of_reviews">(5 Reviews)</span>
                                </div>
                                <p className="card-text">87500</p>
                                <a
                                    href="#"
                                    id="view_btn"
                                    className="btn btn-block"
                                >
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                        <div className="card p-3 rounded">
                            <img
                                src="./images/products/4.jpg"
                                className="card-img-top mx-auto"
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    PTron Newly Launched Tangent Sports, 60Hrs
                                    Playtime
                                </h5>
                                <div className="ratings mt-auto">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-o"></i>
                                    <i className="fa fa-star-o"></i>
                                    <span id="no_of_reviews">(5 Reviews)</span>
                                </div>
                                <p className="card-text">1300</p>
                                <a
                                    href="#"
                                    id="view_btn"
                                    className="btn btn-block"
                                >
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                        <div className="card p-3 rounded">
                            <img
                                src="./images/products/5.jpg"
                                className="card-img-top mx-auto"
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    Campus Men's Maxico Running Shoes
                                </h5>
                                <div className="ratings mt-auto">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-o"></i>
                                    <i className="fa fa-star-o"></i>
                                    <span id="no_of_reviews">(5 Reviews)</span>
                                </div>
                                <p className="card-text">4600</p>
                                <a
                                    href="#"
                                    id="view_btn"
                                    className="btn btn-block"
                                >
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}
