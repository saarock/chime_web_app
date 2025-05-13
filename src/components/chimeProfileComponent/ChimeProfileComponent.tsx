import "../../styles/index";
import { useAuth } from "../../hooks";
import { useCallback, useEffect, useState } from "react";
import Input from "../input/Input";
import { GiCancel } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";

export const ChimeProfileComponent = () => {
    const { user, isAuthenticated } = useAuth();
    const [isHaveToEdit, setIsHaveToEdit] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<{ userName: string }>({});

      const changeUserName = useCallback((data: any) => {
        console.log(data);
    }, []);

    return (
        <section className="chime-profile-section">
            {
                (isAuthenticated && user) && (
                    <form className="chime-profile-child-container" onSubmit={handleSubmit(changeUserName)}>
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
                                isHaveToEdit ? <Input type="text" placeHolder="Enter username..." {...register("userName")} /> :
                                    <p className="chime-profile-username">@{user.userName?.toLowerCase() || "unknown"}</p>
                            }
                            <span className={`chime-profile-status ${user.active ? "active" : "inactive"}`}>
                                {user.active ? "Active" : "Inactive"}
                            </span>
                        </div>
                        <div className="chime-profile-details">
                            <table className="chime-profile-table">
                                <tbody>
                                    <tr>
                                        <td><strong>Email:</strong></td>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Phone:</strong></td>
                                        <td>{user.phoneNumber || "Not provided"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Age:</strong></td>
                                        <td>{user.age || "Not specified"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Gender:</strong></td>
                                        <td>{user.gender || "Not specified"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Country:</strong></td>
                                        <td>{user.country || "Not specified"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Relationship Status:</strong></td>
                                        <td>{user.relationShipStatus ? "In a relationship" : "Not specified"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Role:</strong></td>
                                        <td>{user.role || "User"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        {
                            isHaveToEdit ? <button className="chime-profile-edit-cancel-btn" onClick={() => setIsHaveToEdit(false)} >
                                <GiCancel />   Cancel Edit UserName
                            </button> : <button className="chime-profile-edit-btn" onClick={() => setIsHaveToEdit(true)} type="submit">
                                <FaEdit /> Edit UserName
                            </button>
                        }
                    </form>
                ) 
            }
        </section>
    );
};

export default ChimeProfileComponent;
