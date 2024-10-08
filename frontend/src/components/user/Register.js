import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthError } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "/images/default_avatar.png"
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(
        (state) => state.authState
    );

    const onChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0]);
                }
            };
            // To get data as url
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        formData.append("avatar", avatar);
        dispatch(register(formData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
            return;
        }
        if (error) {
            toast(error, {
                position: "bottom-center",
                type: `error`,
                onOpen: () => {
                    dispatch(clearAuthError);
                },
            });
        }
    }, [error, dispatch, isAuthenticated, navigate]);

    return (
        <Fragment>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                        className="shadow-lg"
                    >
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                name="name"
                                type="text"
                                id="name_field"
                                className="form-control"
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                name="email"
                                type="email"
                                id="email_field"
                                className="form-control"
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                name="password"
                                type="password"
                                id="password_field"
                                className="form-control"
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="avatar_upload">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatar mr-3 item-rtl">
                                        <img
                                            src={avatarPreview}
                                            alt="Avatar"
                                            className="rounded-circle"
                                        />
                                    </figure>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={onChange}
                                    />
                                    <label
                                        htmlFor="customFile"
                                        className="custom-file-label"
                                    >
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
