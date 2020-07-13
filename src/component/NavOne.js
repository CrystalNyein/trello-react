import React from 'react'
import './NavOne.css'

const NavOne = () => {
    return (
        <div className="nav1">
            <div className="nav-flex">
                <button className="link"><i className="fas fa-th"></i></button>
                <button className="link"><i className="fas fa-home"></i></button>
                <button className="link"><i className="fab fa-trello"></i>&nbsp;&nbsp; Boards</button>
                <button id="search" className="link">
                    <input type="text" id="search-trello"/>
                    <a className="link showOnInit"><i className="fas fa-search"></i></a>
                    <a className=" showOnFocus link left"><i className="fas fa-expand-alt"></i></a>
                    <a className=" showOnFocus link"><i className="fas fa-times"></i></a>
                </button>
            </div>
            <div className="nav-flex logo"id="logo">   
                <a href="#"><i className="fab fa-trello"></i> Trello</a>             
            </div>
            <div className="nav-flex">
                <button className="link"><i className="fas fa-plus"></i></button>
                <button className="link"><i className="fas fa-info-circle"></i></button>
                <button className="link"><i className="far fa-bell"></i></button>
                <button className="avatar profile"></button>
            </div>
        </div>
    )
}

export default NavOne
