import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from ".././layouts/MetaData";
import { getProducts } from "../../actions/productsActions";
import Loader from ".././layouts/Loader";
import Product from ".././product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import Toolip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

export default function ProductSearch() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector(
        (state) => state.productsState
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [priceChanged, setPriceChanged] = useState(price);
    const [category, setCategory] = useState(null);
    const { keyword } = useParams();
    const categories = [
        "Electronics",
        "Mobile Phones",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
    ];

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo);
    };
    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: "bottom-center",
            });
        }
        dispatch(getProducts(keyword, price, category, currentPage));
    }, [error, dispatch, currentPage, keyword, priceChanged, category]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={"Buy Best Products"} />
                    <h1 id="products_heading">Search Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            <div className="col-6 col-md-3 mb-5 mt-5">
                                {/* Price Filter */}
                                <div
                                    className="px-5"
                                    onMouseUp={() => setPriceChanged(price)}
                                >
                                    <Slider
                                        range={true}
                                        marks={{
                                            1: "$1",
                                            1000: "$1000",
                                        }}
                                        min={1}
                                        max={1000}
                                        defaultValue={price}
                                        onChange={(price) => {
                                            setPrice(price);
                                        }}
                                        handleRender={(renderProps) => {
                                            return (
                                                <Toolip
                                                    overlay={`$${renderProps.props["aria-valuenow"]}`}
                                                >
                                                    <div
                                                        {...renderProps.props}
                                                    ></div>
                                                </Toolip>
                                            );
                                        }}
                                    />
                                </div>
                                <hr className="my-5" />
                                {/* Category Filter */}
                                <div className="mt-5">
                                    <h3 className="mb-3">Categories</h3>
                                    <ul className="pl-0">
                                        {categories.map((category) => (
                                            <li
                                                style={{
                                                    cursor: "pointer",
                                                    "list-style": "none",
                                                }}
                                                key={categories}
                                                onClick={() =>
                                                    setCategory(category)
                                                }
                                            >
                                                {category}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-6 col-md-9">
                                <div className="row">
                                    {products &&
                                        products.map((product) => (
                                            <Product
                                                col={4}
                                                key={product._id}
                                                product={product}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    {productsCount > 0 && productsCount > resPerPage ? (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={">"}
                                prevPageText={"<"}
                                firstPageText={"First"}
                                lastPageText={"Last"}
                                itemClass={"page-item"}
                                linkClass={"page-link"}
                            />
                        </div>
                    ) : null}
                </Fragment>
            )}
        </Fragment>
    );
}
