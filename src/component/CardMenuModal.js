import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import './CardMenuModal.css'
import Axios from "axios";

const CardMenuModal = ({card,setCard,setCardMenuClick,pos}) => {
    const [Title, setTitle] = useState(card.title);
    const [float,setFloat] = useState(window.innerWidth-pos.right<175?true:false);
    useEffect(()=>{
        setFloat(window.innerWidth-pos.right<175?true:false);
    },[pos.right])
    useEffect(()=>{
        setTitle(card.title);
    },[card.title])
    
    const closeModal = () =>{
        setCardMenuClick({});
    }
    const saveCardName = () => {
        if(card.title !== Title)
        Axios.put(
            process.env.REACT_APP_END_POINT +
              "/card/update/" +
              card.listId +
              "/" +
              card.id,
            {
              title: Title,
              description: card.description,
              position: card.position,
              status: card.status
            }
        ).then(res =>{
            setCard(res.data);
        });
        closeModal();
    }
    const archiveCard = () => {
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
            setCard(res.data);
        });
        closeModal();
    }
    return card.id ?(
        <div id="cardMenu" className="s-modal card-menu-modal">                            
        <span className="s-close float-right" onClick={closeModal}>&times;</span>
            <div className="c-modal-content">
                <div className="edit-card" style={{top:pos.top+"px",left:pos.left+"px",width:pos.width+"px"}}>
                    <textarea className="rounded" value={Title} onChange={e=>setTitle(e.target.value)} autoFocus></textarea>
                    <button className="btn" onClick={saveCardName}>Save</button>
                </div>
                <div className="action" style={{left:float?(pos.left-175):(pos.right+3)+"px",top:(window.innerHeight-pos.top<210)?(window.innerHeight-310):(pos.top-91)+"px"}}>
                    <button className="link rounded" style={{float:float?"right":"left"}}>&nbsp;<i className="fas fa-tag"></i>&nbsp;&nbsp;Edit Labels</button>
                    <button className="link rounded" style={{float:float?"right":"left"}}>&nbsp;<i className="fas fa-user"></i>&nbsp;&nbsp;Change Members</button>
                    <button className="link rounded" style={{float:float?"right":"left"}}>&nbsp;<i className="fas fa-arrow-right"></i>&nbsp;&nbsp;Move</button>
                    <button className="link rounded" style={{float:float?"right":"left"}}>&nbsp;<i className="fas fa-credit-card"></i>&nbsp;&nbsp;Copy</button>
                    <button className="link rounded" style={{float:float?"right":"left"}}>&nbsp;<i className="fas fa-clock"></i>&nbsp;&nbsp;Change Due Date</button>
                    <button className="link rounded" style={{float:float?"right":"left"}} onClick={archiveCard}>&nbsp;<i className="fas fa-archive"></i>&nbsp;&nbsp;Archive</button>
                </div>
            </div>
        </div>
    ):null;
}

export default CardMenuModal
