import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../reducer/ContextReducer';


const Navbar = () => {
    const data = useCart()
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('foodAppToken')
        navigate('/')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <NavLink className="navbar-brand fw-semibold fs-2 fst-italic" to="/">FoodApp</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li>
                                {
                                    (localStorage.getItem('foodAppToken')) ? <NavLink className="nav-link" aria-current="page" to="/myorder">My Orders</NavLink>
                                        : ''
                                }
                            </li>
                        </ul>
                        {
                            (!localStorage.getItem('foodAppToken')) ?
                                <div>
                                    <NavLink className="btn bg-white fw-normal mx-2 text-success text-capitalize" to="/login">log in</NavLink>
                                    <NavLink className="btn bg-white fw-normal mx-2 text-success text-capitalize" to="/signup">sign up</NavLink>
                                </div>
                                :
                                <div>
                                    <Link className="position-relative btn bg-white fw-normal mx-2 text-success text-capitalize" to='/mycart'>My Cart
                                        
                                           {
                                            data.length === 0 ?'':<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {
                                                data.length >= 100?'99+':data.length
                                            }
                                            </span>
                                           }
                                    </Link>
                                    <Link className="btn bg-white fw-normal mx-2 text-success text-capitalize" onClick={handleLogout}>Log Out</Link>

                                </div>

                        }

                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;