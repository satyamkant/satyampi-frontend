import logo from "../../Resources/Images/favicon.ico"
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"
import Login from "../Login/Login";
import AuthService from "../Controller/AuthService";
import '../../DAO/schema'
import { LoginResponse, NavbarProps } from "../../DAO/schema";
import { useAuth } from "../../DAO/AuthContext";

function Navbar({ isAuthenticated, onAutheChange }: NavbarProps) {

    const { user, logout, setUser } = useAuth();

    const handleLoginSuccess = (response: LoginResponse) => {
        console.log(response)
        if (response.status === "200 OK") {
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            onAutheChange();
        }
    }

    const handleLogout = () => {
        AuthService.LogoutService().then((response) => {
            console.log(response);
            if (response.message === "Successfully Logged out") {
                alert("You have been logged out.");
                logout();
                window.location.href = "/";
            }
        })
    };

    return (
        <header className="md-header">
            <nav className="navbar navbar-dark navbar-expand-md">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">
                        <img src={logo} alt="satyampi logo" width="30" height="24" /> SatyamPi
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} aria-current="page" to="/home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} aria-current="page" to="/project">Projects</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} aria-current="page" to="/blog/intro">Blogs</NavLink>
                            </li>
                        </ul>
                        <div className="ms-auto">
                            {isAuthenticated ?
                                (

                                    <ul className="navbar-nav">
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                                role="button" data-bs-toggle="dropdown"
                                                aria-expanded="false"> Hi {user?.name}!
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="navbarDropdown">
                                                <li><Link className="dropdown-item" to={`/${user?.name}/dashboard`}>Profile</Link></li>
                                                <li><Link className="dropdown-item" to="#">Editor</Link></li>
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                </li>
                                                <li><a className="dropdown-item" href="#"
                                                    onClick={handleLogout}>Logout</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                )
                                :
                                (
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop">
                                        Login
                                    </button>
                                )}
                        </div>
                    </div>

                </div>
            </nav>
            <Login onLoginSuccess={handleLoginSuccess} />
        </header>
    )
}

export default Navbar;