import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        console.log("🔐 Token desde sessionStorage:", token);
    
        if (!token) {
            console.log("❌ No hay token, redirigiendo a login...");
            navigate("/login");
            return;
        }
    
        console.log("✅ Token encontrado. Haciendo fetch a /api/private");
    
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((resp) => {
                console.log("📡 Respuesta cruda:", resp);
                if (!resp.ok) {
                    return resp.json().then(err => {
                        throw new Error(err.msg || "Token inválido o expirado");
                    });
                }
                return resp.json();
            })
            .then((data) => {
                console.log("🎉 Respuesta JSON:", data);
                setMessage(data.msg);
            })
            .catch((error) => {
                console.error("🔥 Error en fetch:", error);
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
