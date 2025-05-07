import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetch(process.env.BACKEND_URL + "/api/private", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Token inválido o expirado");
            }
            return resp.json();
        })
        .then(data => {
            setMessage(data.msg);
        })
        .catch(error => {
            console.error(error);
            sessionStorage.removeItem("token");
            navigate("/login");
        });
    }, [navigate]);

    return (
        <div className="container">
            <h2>Área Privada</h2>
            <p>{message}</p>
        </div>
    );
};
