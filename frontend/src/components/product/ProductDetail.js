import { Fragment, useEffect, useState } from "react";
import { getProduct } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import { Carousel } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";

export default function ProductDetail() {
    const { loading, product } = useSelector((state) => state.productState);

    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        const count = document.querySelector(".count");
        if (product.stock == 0 || count.valueAsNumber >= product.stock) {
            return;
        }
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        const count = document.querySelector(".count");
        if (count.valueAsNumber == 1) {
            return;
        }
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    };

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="row f-flex justify-content-around">
                        <div
                            className="col-12 col-lg-5 img-fluid"
                            id="product_image"
                        >
                            <Carousel pause="hover">
                                {product.images &&
                                    product.images.length > 0 &&
                                    product.images.map((image) => (
                                        <Carousel.Item key={image._id}>
                                            <img
                                                className="d-block w-100"
                                                src={image.image}
                                                alt={product.name}
                                                height="500"
                                                width="500"
                                            />
                                        </Carousel.Item>
                                    ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">{product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div
                                    className="rating-inner"
                                    style={{
                                        width: `${
                                            (product.ratings / 5) * 100
                                        }%`,
                                    }}
                                ></div>
                            </div>
                            <span id="no_of_reviews">
                                ({product.numOfReviews} Reviews)
                            </span>

                            <hr />

                            <p id="product_price">₹{product.price}</p>
                            <div className="stockCounter d-inline">
                                <span
                                    className="btn btn-danger minus"
                                    onClick={decreaseQuantity}
                                >
                                    -
                                </span>

                                <input
                                    type="number"
                                    className="form-control count d-inline"
                                    value={quantity}
                                    readOnly
                                />
                                <span
                                    className="btn btn-success plus"
                                    onClick={increaseQuantity}
                                >
                                    +
                                </span>
                            </div>
                            <button
                                type="button"
                                id="cart_btn"
                                className="btn btn-success d-inline ml-4"
                                onClick={() =>
                                    dispatch(addCartItem(product._id, quantity))
                                }
                                disabled={product.stock == 0 ? true : false}
                            >
                                Add to Cart
                            </button>

                            <hr />

                            <p>
                                Status:{" "}
                                <span
                                    className={
                                        product.stock > 0
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                    id="stock_status"
                                >
                                    {product.stock > 0
                                        ? "In Stock"
                                        : "Out of Stock"}
                                </span>
                            </p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>

                            <hr />

                            <p id="product_seller mb-3">
                                Sold by: <strong>{product.seller}</strong>
                            </p>
                            <button
                                id="review_btn"
                                type="button"
                                className="btn btn-success mt-4"
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
                                        <div
                                            className="modal-dialog"
                                            role="document"
                                        >
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5
                                                        className="modal-title"
                                                        id=""
                                                    >
                                                        Hi
                                                    </h5>
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
            )}
        </Fragment>
    );
}
