import React from 'react'
import { PageProtectorProps } from '../../types'
import reg_logo from "../../assets/images/reg_log.png";
import "../../styles/index";

const ChimeRegisterLoginPageWrapper: React.FC<PageProtectorProps> = ({ children }) => {
    return (
        <>
            <div className="chime-entry-page">
                <div className="chime-entry-page-entry-image">
                    <img src={reg_logo} alt="login_register use-case image" />
                </div>
                {children}

            </div>
        </>
    )
}

export default ChimeRegisterLoginPageWrapper