import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "../cart/Shipping";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const { user } = useSelector((state) => state.authState);
    const { items: cartItems, shippingInfo } = useSelector(
        (state) => state.cartState
    );
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
        shipping: {
            name: user.name,
            address: {
                city: shippingInfo.city,
                postal_code: shippingInfo.postal_code,
                state: shippingInfo.state,
                country: shippingInfo.country,
                line1: shippingInfo.address,
            },
            phone: shippingInfo.phoneNo,
        },
    };

    const order = {
        orderItems: cartItems,
        shippingInfo,
    };

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice;
        order.shippingPrice = orderInfo.shippingPrice;
        order.taxPrice = orderInfo.taxPrice;
        order.totalPrice = orderInfo.totalPrice;
    }

    useEffect(() => {
        validateShipping(shippingInfo, navigate);
    }, [shippingInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector("#pay_btn").disabled = true;
        try {
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData
            );
            const clientSecret = data.client_secret;
            const result = stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                    },
                },
            });

            if (result.error) {
                toast((await result).error.message, {
                    type: "error",
                    position: "bottom-center",
                });
                document.querySelector("#pay_btn").disabled = false;
            } else {
                if ((await result).paymentIntent.status === "succeeded") {
                    toast("Payment Success", {
                        type: "success",
                        position: "bottom-center",
                    });
                    //dispatch(orderCompleted());
                    navigate("/order/success");
                } else {
                    toast("Please try again", {
                        type: "error",
                        position: "bottom-center",
                    });
                }
            }
        } catch (error) {}
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-4">Card Info</h1>

                    <div className="form-group">
                        <label htmlFor="card_num_field">Card Number</label>
                        <CardNumberElement
                            type="text"
                            id="card_num_field"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="card_exp_field">Card Expiry</label>
                        <CardExpiryElement
                            type="text"
                            id="card_exp_field"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="card_cvc_field">Card CVC</label>
                        <CardCvcElement
                            type="text"
                            id="card_cvc_field"
                            className="form-control"
                        />
                    </div>

                    <button
                        type="submit"
                        id="pay_btn"
                        className="btn btn-block py-3"
                    >
                        Pay - {`$${orderInfo && orderInfo.totalPrice}`}
                    </button>
                </form>
            </div>
        </div>
    );
}
