export default function OrderSuccess() {
    return (
        <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
                <img
                    src="/images/success.png"
                    alt=""
                    className="my-5 img-fluid d-block mx-auto"
                    height="200"
                    width="200"
                />
                <h2>Your Order has been placed successfully</h2>
                <a href="/order">Go to Orders</a>
            </div>
        </div>
    );
}
