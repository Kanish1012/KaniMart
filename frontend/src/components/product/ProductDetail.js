import { Fragment, useEffect } from "react";
import { getProduct } from "../../actions/productActions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProduct(id));
    });

    return (
        <Fragment>
            <div className="row f-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <img src="/images/products/1.jpg" alt="image" />
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>Dell Ins</h3>
                    <p id="product_id">Id of prod</p>

                    <hr />

                    <div className="rating-outer">
                        <div className="rating-inner"></div>
                    </div>
                    <span id="no_of_reviews">(2 Reviews)</span>

                    <hr />

                    <p id="product_price">100</p>
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus"></span>

                        <input
                            type="number"
                            className="form-control count d-inline"
                            value="1"
                        />
                        <span className="btn btn-primary plus">+</span>
                    </div>
                    <button
                        id="cart_btn"
                        className="btn-btn-primary d-inline"
                    ></button>

                    <hr />

                    <p>
                        Status: <span id="stock_status">In Stoc</span>
                    </p>

                    <hr />

                    <h4 className="mt-2">Description:</h4>
                    <p>dummy data</p>

                    <hr />

                    <p id="product_seller mb-3">
                        Sold by: <strong>KaniMart</strong>
                    </p>
                    <button
                        id="review_btn"
                        type="button"
                        className="btn btn-primary mt-4"
                    >
                        Submit Your Review
                    </button>

                    {/* need to make changes */}
                    <div className="row mt-2 mb-5">
                        <div className="rating w-50">
                            <div
                                className="modal fade"
                                id="ratingModal"
                                tabIndex="-1"
                            >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5
                                                className="modal-title"
                                                id=""
                                            ></h5>
                                            <button className="close">
                                                <span>&items;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <ul className="stars">
                                                <li className="star">
                                                    i.fa{" "}
                                                    <i
                                                        class="fa fa-hourglass-start"
                                                        aria-hidden="true"
                                                    ></i>
                                                </li>
                                                <li className="star">
                                                    i.fa{" "}
                                                    <i
                                                        class="fa fa-hourglass-start"
                                                        aria-hidden="true"
                                                    ></i>
                                                </li>
                                                <li className="star">
                                                    i.fa{" "}
                                                    <i
                                                        class="fa fa-hourglass-start"
                                                        aria-hidden="true"
                                                    ></i>
                                                </li>
                                                <li className="star">
                                                    i.fa{" "}
                                                    <i
                                                        class="fa fa-hourglass-start"
                                                        aria-hidden="true"
                                                    ></i>
                                                </li>
                                                <li className="star">
                                                    i.fa{" "}
                                                    <i
                                                        class="fa fa-hourglass-start"
                                                        aria-hidden="true"
                                                    ></i>
                                                </li>
                                            </ul>
                                            <textarea
                                                name="review"
                                                id="review"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
