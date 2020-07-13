import React from 'react'
import ReactDOM from 'react-dom'
import './ListModal.css'
import Axios from 'axios'

const ListModal = ({archiveList}) => {
    const closeModal = () => {
        document.getElementById("listMenu").style.display = "none";
    }
    const archive = (event) => {
        const datakey=event.target.parentNode.parentNode.getAttribute('datakey');
        archiveList(datakey);
    }
    return (

        <div id="listMenu" className="s-modal list-modal">
            <div className="s-modal-content rounded">
                <span className="s-close" onClick={closeModal}>&times;</span>
                <h3>List Actions</h3>
                <hr />
                <p className="link">Add Card...</p>
                <p className="link">Copy List...</p>
                <p className="link">Move List...</p>
                <p className="link">Watch</p>
                <hr />
                <p className="link">Move All Cards in This List...</p>
                <p className="link">Archive All Cards in This Lists...</p>
                <hr />
                <p className="link" id="listArchive" onClick={archive}>Archive This List</p>
            </div>
        </div>

    )
}

export default ListModal
