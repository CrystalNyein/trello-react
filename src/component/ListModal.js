import React,{useEffect,useState} from 'react'
import ReactDOM from 'react-dom'
import './ListModal.css'
import Axios from 'axios'

const ListModal = ({archiveList}) => {
    const [listMenu, setlistMenu] = useState();
    useEffect(()=>{
        setlistMenu(document.getElementById("listMenu"));
    },[]);
    const closeModal = () => {
        listMenu.style.display = "none";
    }
    const archive = (event) => {
        const listid=event.target.parentNode.parentNode.getAttribute('listid');
        Axios.put(process.env.REACT_APP_END_POINT + "/list/" + listid + "/status/2")
        .then(res => archiveList(res.data));
        listMenu.style.display = "none";
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
                <p className="link" onClick={archive}>Archive This List</p>
            </div>
        </div>

    )
}

export default ListModal
