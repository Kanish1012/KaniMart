import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    decreaseCartItemQty,
    increaseCartItemQty,
    removeItemFromCart,
} from "../../slices/cartSlice";

export default function Cart() {
    const { items } = useSelector((state) => state.cartState);
    const dispatch = useDispatch();

    const increaseQty = (item) => {
        const count = item.quantity;
        if (item.stock == 0 || count >= item.stock) {
            return;
        }
        dispatch(increaseCartItemQty(item.product));
    };

    const decreaseQty = (item) => {
        const count = item.quantity;
        if (count == 1) {
            return;
        }
        dispatch(decreaseCartItemQty(item.product));
    };

    return (
        <Fragment>
            {items.length == 0 ? (
                <h2 className="mt-5">Your Cart is Empty</h2>
            ) : (
                <Fragment>
                    <h2 className="mt-5">
                        Your Cart: <b>{items.length} items</b>
                    </h2>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {items.map((item) => (
                                <Fragment>
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    height="90"
                                                    width="115"
                                                />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link
                                                    to={`/product/${item.product}`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </div>

                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">
                                                    {item.price}
                                                </p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span
                                                        className="btn btn-danger minus"
                                                        onClick={() =>
                                                            decreaseQty(item)
                                                        }
                                                    >
                                                        -
                                                    </span>
                                                    <input
                                                        type="number"
                                                        id="quantity"
                                                        className="form-control count d-inline"
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <span
                                                        className="btn btn-success plus"
                                                        onClick={() =>
                                                            increaseQty(item)
                                                        }
                                                    >
                                                        +
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i
                                                    id="delete_cart_item"
                                                    className="fa fa-trash btn btn-danger"
                                                    onClick={() =>
                                                        dispatch(
                                                            removeItemFromCart(
                                                                item.product
                                                            )
                                                        )
                                                    }
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}

                            <hr />
                        </div>
                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>
                                    Subtotal:
                                    <span className="order-summary-values">
                                        1 units
                                    </span>
                                </p>
                                <p>
                                    Est. total:
                                    <span className="order-summary-values">
                                        price
                                    </span>
                                </p>
                                <hr />
                                <button
                                    id="checkout_btn"
                                    className="btn btn-success btn-block"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                        <hr />
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
