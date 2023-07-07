import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { userContext } from '../App';

const Navbar = () => {
    const { state, dispatch } = useContext(userContext)
    const RenderMenu = () => {
        if (!state) {
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link fw-semibold" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link fw-semibold" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link fw-semibold" to='/contact'>Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link fw-semibold" to='/logout'>LogOut</NavLink>
                    </li>
                </>
            )
        }
        else{
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link fw-semibold" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link fw-semibold" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link fw-semibold" to='/contact'>Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link fw-semibold" to='/login'>Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link fw-semibold" to='/register'>Register</NavLink>
                    </li>
                </>
            )
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/"><h2>M.H. IT</h2></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                        {/* <navRender></navRender> */}
                        <RenderMenu></RenderMenu>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;