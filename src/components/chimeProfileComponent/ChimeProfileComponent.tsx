import "../../styles/index";
import { useAuth } from "../../hooks";
import LoadingComponent from "../loadingComponent/LoadingComponent";
import { useState } from "react";
import Input from "../input/Input";
import { GiCancel } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";

export const ChimeProfileComponent = () => {
    const { user, isAuthenticated } = useAuth();
    const [isHaveToEdit, setIsHaveToEdit] = useState<boolean>(false);


    return (
        <>
            {
                isAuthenticated && user ? (
                    <div className="chime-profile-child-container">
                        <div className="chime-profile-header">
                            <img
                                src={user.profilePicture}
                                alt="Profile"
                                onError={(e) => {
                                    e.currentTarget.src = "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/29529706/2024/5/16/4db832c7-d67c-46bd-9599-fa167eb61e8b1715800226613SoftToysandDolls1.jpg";
                                }}
                                className="chime-profile-image"
                            />
                            <h2 className="chime-profile-name">{user.fullName}</h2>
                            {
                                isHaveToEdit ? <Input type="text" placeHolder="Enter username..." onChange={() => { }} /> :
                                    <p className="chime-profile-username">@{user.userName || "unknown"}</p>
                            }
                            <span className={`chime-profile-status ${user.active ? "active" : "inactive"}`}>
                                {user.active ? "Active" : "Inactive"}
                            </span>
                        </div>

                        {
                            isHaveToEdit ? <button className="chime-profile-edit-cancel-btn" onClick={() => setIsHaveToEdit(false)}>
                                <GiCancel />   Cancel Edit UserName
                            </button> : <button className="chime-profile-edit-btn" onClick={() => setIsHaveToEdit(true)}>
                                <FaEdit /> Edit UserName
                            </button>
                        }
                    </div>
                ) : <LoadingComponent />
            }
        </>
    );
};

export default ChimeProfileComponent;
