import React from 'react'
import './NavTwo.css'

const NavTwo = () => {
    return (
        <div className="nav2">
            <div className="nav-flex">
                <h2>FE - Common</h2>
                <button className="link"><i className="far fa-star"></i></button> 
                <div className="border-left border-dark"></div>
                <p className="px-2">Private Team</p> 
                <div className="border-left border-dark"></div>
                <button className="link"><i className="fas fa-user-friends"></i>&nbsp; Team Visible</button> 
                <div className="border-left border-dark"></div>
                <button className="avatar profile"></button>
                <button className="link">Invite</button>
            </div>
            <div className="nav-flex">
                <button className="link"><i className="fas fa-concierge-bell"></i>&nbsp; Butler (2 Tips)</button>
                <button className="link"><i className="fas fa-ellipsis-h"></i>&nbsp; Show Menu</button>
            </div>
        </div>
    )
}

export default NavTwo
