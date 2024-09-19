import React from "react";
import { useNavigate } from "react-router-dom";
import "./adminInfo.css";


export default function InformationForAdmins() {
    const navigate = useNavigate();

    return (
        // pagina pentru informatii admin
        <div className="login_container">
            <p className="logo_text">CloudCargo for admins</p>

            <div className="bg ">

                <h1 className="logo_text ">Create Admin Account</h1>

                <p className="form_label ">If you are a rescue team, trying to setup a drone system in your area,
                    you should contact an official from CloudCargo, and reach to local
                    emergency services, for more details and authorizations.</p>

            </div>

        </div>
    
    )
    
} 
