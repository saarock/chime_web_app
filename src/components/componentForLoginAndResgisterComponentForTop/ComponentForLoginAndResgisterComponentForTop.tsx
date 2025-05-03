import React from "react"
import { ComponentForLoginAndResgisterComponentForTopProps } from "../../types"
import { NavLink } from "react-router"
import logo from "../../assets/images/logo.png";
import "../../styles";


/**
 * This component sits on top of the login and register component like your don't have account, already have account
 * @param param0 Props to set the data synamically 
 * @returns 
 */
const ComponentForLoginAndResgisterComponentForTop: React.FC<ComponentForLoginAndResgisterComponentForTopProps> = ({
    title,
    secondTitle,
    path,
    name,
}) => {
    return (
        <div className="chime-login-register-top-component">
            <div className="chime-login-register-top-component-logo-container">
                <img src={logo} alt="logo" className="chime-login-register-top-component-logo" />
            </div>
            <div className="chime-login-register-top-component-title-wrapper">
                <h1>{title}</h1>
            </div>
            <div className="chime-login-register-top-component-second-title">
                <span>{secondTitle}</span> <span> {
                    name === "login" ? <span> <NavLink to={path} className={`chime-link`}>{name}</NavLink></span> :
                        <span> <NavLink to={path} className={`chime-link`}>{name}</NavLink></span>
                }</span>
            </div>
        </div>
    )
}

export default ComponentForLoginAndResgisterComponentForTop