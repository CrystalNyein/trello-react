import React,{useState} from 'react'
import ReactDOM from 'react-dom'
import './CardMenuModal.css'
import Axios from "axios";

const CardMenuModal = ({card,editCardName,editCardStatus}) => {
    const [Title, setTitle] = useState(card.title);
    console.log(card.id);
    const closeModal = (e) =>{
        e.target.parentNode.style.display="none";
    }
    const saveCardName = (e) => {
        console.log(card);
        const cardName = e.target.previousSibling.value;
        const cardMenu = document.getElementById("cardMenu");
        Axios.put(
            process.env.REACT_APP_END_POINT +
              "/card/update/" +
              card.listId +
              "/" +
              card.id,
            {
              title: cardName,
              description: card.description,
              position: card.position,
              status: card.status
            }
        ).then(res =>{
            editCardName(res.data);
        });
        cardMenu.style.display = "none";
    }
    const archiveCard = (e) => {
        const cardMenuModal = document.getElementById("cardMenu");
        Axios.put(
            process.env.REACT_APP_END_POINT +
              "/card/update/" +
              card.listId +
              "/" +
              card.id,
            {
              title: card.title,
              description: card.description,
              position: card.position,
              status: 2
            }
        ).then(res =>{
            editCardStatus(res.data);
        });
        cardMenuModal.style.display = "none";
    }
    return card.id ?(
        <div id="cardMenu" className="s-modal card-menu-modal">        
            <span className="s-close float-right" onClick={closeModal}>&times;</span>
            <div className="c-modal-content">            
                <div className="edit-card">
                    <textarea className="rounded" value={Title} onChange={e=>setTitle(e.target.value)}></textarea>
                    <button className="btn" onClick={saveCardName}>Save</button>
                </div>
                <div className="action">
                    <button className="link rounded">&nbsp;<i className="fas fa-tag"></i>&nbsp;&nbsp;Edit Labels</button>
                    <button className="link rounded">&nbsp;<i className="fas fa-user"></i>&nbsp;&nbsp;Change Members</button>
                    <button className="link rounded">&nbsp;<i className="fas fa-arrow-right"></i>&nbsp;&nbsp;Move</button>
                    <button className="link rounded">&nbsp;<i className="fas fa-credit-card"></i>&nbsp;&nbsp;Copy</button>
                    <button className="link rounded">&nbsp;<i className="fas fa-clock"></i>&nbsp;&nbsp;Change Due Date</button>
                    <button className="link rounded" onClick={archiveCard}>&nbsp;<i className="fas fa-archive"></i>&nbsp;&nbsp;Archive</button>
                </div>
            </div>
        </div>
    ):null;
}

export default CardMenuModal
