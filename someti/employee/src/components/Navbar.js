import React, { useContext } from 'react';
import logo from '../images/logo.png'
import { NavLink } from 'react-router-dom';
import { empContext } from '../App'

const Navbar = () => {
    const { state, dispatch } = useContext(empContext)
    return (
        <>
            <nav className="navbar">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/"><img src={logo} alt="logo" /></NavLink>
                    <button className="navbar-toggler bg-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{ backgroundColor: '#143d59' }} >
                        <div className="offcanvas-header">
                            <img src={logo} alt="logo" className="offcanvas-title" id="offcanvasNavbarLabel" />
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                {
                                    state ?
                                        <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" aria-current="page" to="/registermember">Create Member</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" aria-current="page" to="/allmembers">All Membes List</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" aria-current="page" to="/postDeposite">Deposite Posting</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" aria-current="page" to="/logout">Logout</NavLink>
                                            </li>
                                        </>
                                        :
                                        <>

                                            <li className="nav-item">
                                                <NavLink className="nav-link" aria-current="page" to="/login">Log In</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" aria-current="page" to="/signin">Sign In</NavLink>
                                            </li>
                                        </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;