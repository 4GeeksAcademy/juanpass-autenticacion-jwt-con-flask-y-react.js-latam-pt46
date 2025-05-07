import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Autenticación con Flask JWT</span>
                </Link>
                <div className="ml-auto d-flex gap-2">
                    <Link to="/signup">
                        <button className="btn btn-outline-secondary">Registro</button>
                    </Link>
                    <Link to="/login">
                        <button className="btn btn-outline-success">Login</button>
                    </Link>
                    <Link to="/private">
                        <button className="btn btn-outline-primary">Área Privada</button>
                    </Link>
                    <button onClick={handleLogout} className="btn btn-danger">
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};
