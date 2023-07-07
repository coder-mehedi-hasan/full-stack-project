import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { userContext } from '../App';
import Logo from '../media/logo-light.png'
import Nagorik from './Nagorik';
import LandCorner from './LandCorner';

const Navbar = () => {
    const {state, dispatch} = useContext(userContext)
    const landTokenStorage = localStorage.getItem('landtaxbd')
    const landTokenCookie = document.cookie.split('; ').find((row) => row.startsWith('landtaxbd='))?.split('=')[1];
    useEffect(() => {
        if(landTokenCookie && landTokenStorage && landTokenCookie===landTokenStorage){
            dispatch({type:'USER',payload:true})
        }else{
            dispatch({type:'USER',payload:false})
        }
    }, [])
    return (
        <>
            <nav className="navbar navbar-expand-lg" id='navbar'>
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/"><img src={Logo} alt="logo" /></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            {
                                state ?
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/logout">LogOut</NavLink>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login">LogIn</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/signin">Sign In</NavLink>
                                        </li>
                                    </>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
            <Nagorik></Nagorik>
            <LandCorner></LandCorner>
        </>
    );
};

export default Navbar;