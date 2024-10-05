import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/admin/dashboard">
                            <i className="fas fa-tachometer-alt"> Dashboard</i>
                        </Link>
                    </li>

                    <li>
                        <NavDropdown
                            title={
                                <i className="fa fa-product-hunt"> Product</i>
                            }
                        >
                            <NavDropdown.Item
                                onClick={() => navigate("/admin/products")}
                            >
                                <i className="fa fa-shopping-basket"> All</i>
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() =>
                                    navigate("/admin/products/create")
                                }
                            >
                                <i className="fa fa-plus"> Create</i>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </li>

                    <li>
                        <Link to="/admin/orders">
                            <i className="fa fa-shopping-basket"> Orders</i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/users">
                            <i className="fa fa-users"> Users</i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/reviews">
                            <i className="fa fa-comments"> Reviews</i>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
