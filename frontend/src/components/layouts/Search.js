import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Search() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`search/${keyword}`);
    };

    return (
        <form onSubmit={searchHandler}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}
                    value={keyword}
                />
                <div className="input-group-append">
                    <button id="search-btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    );
}
