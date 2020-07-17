import React from 'react'
import ReactDOM from 'react-dom'
import './CardMenuModal.css'

const CardMenuModal = () => {
    const closeModal = (e) =>{
        e.target.parentNode.style.display="none";
    }
    return (
        <div id="cardMenu" className="s-modal card-menu-modal">        
            <span className="s-close float-right" onClick={closeModal}>&times;</span>
            <div className="c-modal-content">            
                <div className="edit-card">
                    <textarea className="rounded"></textarea>
                    <button className="btn">Save</button>
                </div>
                <div className="action">
                    <button className="link rounded">&nbsp;<i className="fas fa-tag"></i>&nbsp;&nbsp;Edit Labels</button>
                    <button className="link rounded">&nbsp;<i className="fas fa-user"></i>&nbsp;&nbsp;Change Members</button>
                    <button className="link rounded">&nbsp;<i className="fas fa-arrow-right"></i>&nbsp;&nbsp;Move</button>
                    <button className="link rounded">&nbsp;<i className="fas fa-credit-card"></i>&nbsp;&nbsp;Copy</button>
                    <button className="link rounded">&nbsp;<i className="fas fa-clock"></i>&nbsp;&nbsp;Change Due Date</button>
                    <button className="link rounded">&nbsp;<i className="fas fa-archive"></i>&nbsp;&nbsp;Archive</button>
                </div>
            </div>
        </div>
    )
}

export default CardMenuModal
