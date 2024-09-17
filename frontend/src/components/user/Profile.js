import React from "react";
import { useSelector } from "react-redux";
import Loader from "../layouts/Loader";

export default function Profile() {
    const { user } = useSelector((state) => state.authState);

    if (!user) {
        return <Loader />;
    }

    return (
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
                <figure className="avatar avatar-profile">
                    <img
                        src={user.avatar ?? "/images/default_avatar.png"}
                        alt="profile"
                        className="rounded-circle img-fluid"
                    />
                </figure>
                <a
                    href="#"
                    id="edit_profile"
                    className="btn btn-primary btn-block my-5"
                >
                    My Profile
                </a>
            </div>
            <div className="col-12 col-md-5">
                <h4>Full Name</h4>
                <p>{user.name}</p>

                <h4>Email Address</h4>
                <p>{user.email}</p>

                <h4>Joined</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>

                <a href="#" className="btn btn-danger btn-block mt-5">
                    My Orders
                </a>
                <a href="#" className="btn btn-primary btn-block mt-3">
                    Change Password
                </a>
            </div>
        </div>
    );
}
