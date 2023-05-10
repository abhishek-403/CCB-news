import React, { useState } from 'react'
import './navbar.scss'

import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const [darkTheme,setDarkTheme] = useState(false)
    function handleTheme(){
        setDarkTheme(!darkTheme);
        if(darkTheme){
            document.body.classList.remove('dark-theme')
            
        }
        else{
            document.body.classList.add('dark-theme')
        }


    }
    const navigate= useNavigate()


    return <>
        <nav id='nav' className='navbar'>
            <div className="container">
                <div className="content">

                    <div className="left center">
                        <h1 className='head'><Link to='/'>
                            CCB NEWS
                        </Link>
                        </h1>

                    </div>

                    <div className="mid ">

                        <ul className='center'>
                            <li><Link to='/'>General</Link></li>
                            <li><Link to='/sports'>Sports</Link></li>
                            <li><Link to='/science' >Science</Link></li>
                            <li><Link to='/business' onClick={()=>navigate('/business')} >Business</Link></li>
                        </ul>

                    </div>
                    <div className="right center">
                        <div className="auth">
                            Login/Signup

                        </div>
                        <div className="profile">

                        </div>
                        <div className="icons">

                            <i onClick={handleTheme} id="dark-icon" className={`uil ${darkTheme ? "uil-sun" : "uil-moon"}`}></i>
                        </div>

                    </div>
                </div>
            </div>

        </nav>

    </>

}

export default Navbar
