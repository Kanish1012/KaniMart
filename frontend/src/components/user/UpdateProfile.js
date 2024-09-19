import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/userActions";

export default function UpdateProfile() {
    const { loading, error, user, isUpdated } = useSelector(
        (state) => state.authState
    );
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "/images/default_avatar.png"
    );
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("avatar", avatar);
        dispatch(updateProfile(formData));
    };

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) {
                setAvatarPreview(user.avatar);
            }
        }

        if (isUpdated) {
            toast("Profile updated successfully", {
                type: "success",
                position: "bottom-center",
            });
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
            return;
        }
    }, [user, isUpdated, error]);

    return (
        <div className="row wrapper">
            <form
                onSubmit={submitHandler}
                encType="multipart/form-data"
                className="shadow-lg"
            >
                <h1 className="mt-2 mb-5">Update Profile</h1>

                <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                        type="name"
                        id="name_field"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="avatar_upload">Avatar</label>
                    <div className="d-flex align-items-center">
                        <div>
                            <figure className="avatar mr-3 item-rtl">
                                <img
                                    src={avatarPreview}
                                    alt="avatar preview"
                                    className="rounded-circle"
                                />
                            </figure>
                        </div>
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                id="customFile"
                                name="avatar"
                                onChange={onChangeAvatar}
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

                <button className="btn update-btn btn-block mt-4 mb-3">
                    Update
                </button>
            </form>
        </div>
    );
}
